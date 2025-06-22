import React from 'react'
import toast from 'react-hot-toast'

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
          <span key={index} className="text-primary-purple font-semibold">
            {part}
          </span>
        )
      }
      return part
    })
  }

  const handleCompare = () => {
    const stored = JSON.parse(localStorage.getItem('comparePlans')) || []
    const exists = stored.some(p => p._id === plan._id)

    if (exists) {
      toast('이미 비교 목록에 있는 요금제입니다.', { icon: '⚠️' })
      return
    }

    const updated = [...stored, plan]
    if (updated.length > 2) updated.shift()

    localStorage.setItem('comparePlans', JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent('compareUpdated'))
    toast.success('요금제가 비교 목록에 추가되었습니다.')
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-xl">
      {/* 제목 */}
      <h3 className="mb-6 text-center text-lg leading-tight font-bold text-gray-900">
        {plan.title}
      </h3>

      {/* 가격 섹션 */}
      <div className="mb-6">
        <div className="mb-1 text-2xl font-bold text-gray-900">
          월 <span className="text-primary-purple">{formatPrice(plan.price)}</span>원
        </div>
        {plan.optionalContractDiscount && (
          <div className="text-sm text-gray-600">
            약정 할인 시 월 {calculateDiscountedPrice(plan.price, plan.optionalContractDiscount)}원
          </div>
        )}
      </div>

      {/* 상세 정보 섹션 */}
      <div className="mb-6 space-y-3">
        {plan.data && (
          <div className="flex items-center justify-between">
            <span className="text-nm text-black">데이터:</span>
            <span className="text-primary-purple text-nm font-medium">
              {highlightNumbers(plan.data)}
            </span>
          </div>
        )}

        {plan.voiceCall && (
          <div className="flex items-center justify-between">
            <span className="text-nm text-gray-700">음성통화:</span>
            <span className="text-nm text-gray-500">{plan.voiceCall}</span>
          </div>
        )}

        {plan.sms && (
          <div className="flex items-center justify-between">
            <span className="text-nm text-gray-700">문자:</span>
            <span className="text-nm text-gray-500">{plan.sms}</span>
          </div>
        )}

        {plan.tethering && (
          <div className="flex items-center justify-between">
            <span className="text-nm text-gray-700">테더링+쉐어링:</span>
            <span className="text-nm text-gray-500">{plan.tethering}</span>
          </div>
        )}
      </div>

      {/* 포함 혜택 섹션 */}
      {allBenefits.length > 0 && (
        <div className="mb-6">
          <div className="text-nm mb-3 font-medium text-gray-700">포함 혜택</div>
          <div className="flex flex-wrap gap-1">
            {allBenefits.slice(0, 3).map((benefit, index) => (
              <span key={index} className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-600">
                {benefit.name}
              </span>
            ))}
            {allBenefits.length > 6 && (
              <span className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-600">
                +{allBenefits.length - 6}개
              </span>
            )}
          </div>
        </div>
      )}

      {/* 비교하기 버튼 */}
      <button
        className="w-full rounded-lg border border-blue-600 bg-white px-4 py-3 font-medium text-blue-600 transition-colors duration-200 hover:bg-gray-50"
        onClick={handleCompare}
      >
        비교하기
      </button>
    </div>
  )
}

export default PlanCard
