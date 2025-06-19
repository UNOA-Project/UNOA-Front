import React from 'react'
import styles from './PlanCard.module.css'

const PlanCard = ({ plan }) => {
  const formatPrice = price => {
    return parseInt(price).toLocaleString()
  }

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return null
    const originalPrice = parseInt(price)
    const discountAmount = parseInt(discount)
    return (originalPrice - discountAmount).toLocaleString()
  }

  const getAllBenefits = () => {
    const benefits = []

    if (plan.basicBenefit) {
      benefits.push({ name: plan.basicBenefit, type: 'basic' })
    }

    if (plan.premiumBenefit) {
      const premiumBenefits = Array.isArray(plan.premiumBenefit)
        ? plan.premiumBenefit
        : [plan.premiumBenefit]
      premiumBenefits.forEach(benefit => benefits.push({ name: benefit, type: 'premium' }))
    }

    if (plan.mediaBenefit) {
      const mediaBenefits = Array.isArray(plan.mediaBenefit)
        ? plan.mediaBenefit
        : [plan.mediaBenefit]
      mediaBenefits.forEach(benefit => benefits.push({ name: benefit, type: 'media' }))
    }

    return benefits
  }

  const allBenefits = getAllBenefits()
  const highlightNumbers = text => {
    if (!text) return text

    const regex = /(\d+(?:\.\d+)?|무제한)/g
    return text.split(regex).map((part, index) => {
      if (/^\d+(?:\.\d+)?$/.test(part) || part === '무제한') {
        return (
          <span key={index} className={styles.highlightNumber}>
            {part}
          </span>
        )
      }
      return part
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.carrierInfo}>
          <div className={styles.carrierBadge}>LG</div>
          <span className={styles.planType}>내 요금제</span>
        </div>
        <span className={styles.rank}>#{plan.popularityRank}</span>
      </div>

      <h3 className={styles.planTitle}>{plan.title}</h3>
      <p className={styles.planDescription}>{plan.description}</p>

      <div className={styles.priceSection}>
        <div className={styles.mainPrice}>월 {highlightNumbers(formatPrice(plan.price))}원</div>
        {plan.premierContractDiscount && (
          <div className={styles.premierDiscount}>
            프리미어 할인 시: 월{' '}
            {calculateDiscountedPrice(plan.price, plan.premierContractDiscount)}원
          </div>
        )}
        {plan.optionalContractDiscount && (
          <div className={styles.discountPrice}>
            선택약정 할인 시: 월{' '}
            {calculateDiscountedPrice(plan.price, plan.optionalContractDiscount)}원
          </div>
        )}
      </div>

      <div className={styles.benefitsSection}>
        <div className={styles.benefitItem}>
          <span className={styles.benefitLabel}>데이터:</span>
          <span className={styles.benefitValue}>{highlightNumbers(plan.data)}</span>
        </div>
        <div className={styles.benefitItem}>
          <span className={styles.benefitLabel}>음성통화:</span>
          <span className={styles.benefitValue}>{plan.voiceCall}</span>
        </div>
        <div className={styles.benefitItem}>
          <span className={styles.benefitLabel}>문자:</span>
          <span className={styles.benefitValue}>{plan.sms}</span>
        </div>
        {plan.tethering && (
          <div className={styles.benefitItem}>
            <span className={styles.benefitLabel}>테더링:</span>
            <span className={styles.benefitValue}>{plan.tethering}</span>
          </div>
        )}
        {plan.tetheringAndSharing && (
          <div className={styles.benefitItem}>
            <span className={styles.benefitLabel}>테더링+쉐어링:</span>
            <span className={styles.benefitValue}>{plan.tetheringAndSharing}</span>
          </div>
        )}
      </div>

      {allBenefits.length > 0 && (
        <div className={styles.additionalBenefits}>
          <div className={styles.benefitsTitle}>포함 혜택</div>
          <div className={styles.benefitTags}>
            {allBenefits.slice(0, 6).map((benefit, index) => (
              <span key={index} className={`${styles.benefitTag} ${styles[benefit.type]}`}>
                {benefit.name}
              </span>
            ))}
            {allBenefits.length > 6 && (
              <span className={`${styles.benefitTag} ${styles.more}`}>
                +{allBenefits.length - 6}개
              </span>
            )}
          </div>
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button className={styles.compareButton}>비교하기</button>
        <button className={styles.applyButton}>신청하기</button>
      </div>
    </div>
  )
}

export default PlanCard
