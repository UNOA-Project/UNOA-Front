import React from 'react'

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
  const basicBenefits = allBenefits.filter(benefit => benefit.type === 'basic')
  const iconBenefits = allBenefits.filter(
    benefit => benefit.type === 'premium' || benefit.type === 'media'
  )

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

  return (
    <div className="flex max-w-65 min-w-65 flex-col rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-xl">
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
            <span className="text-sm text-gray-700">데이터:</span>
            <span className="text-primary-purple text-sm font-medium">
              {highlightNumbers(plan.data)}
            </span>
          </div>
        )}

        {plan.voiceCall && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">음성통화:</span>
            <span className="text-sm text-gray-500">{plan.voiceCall}</span>
          </div>
        )}

        {plan.sms && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">문자:</span>
            <span className="text-sm text-gray-500">{plan.sms}</span>
          </div>
        )}

        {plan.tethering && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">테더링+쉐어링:</span>
            <span className="text-sm text-gray-500">{plan.tethering}</span>
          </div>
        )}
      </div>

      {/* 포함 혜택 섹션 */}
      {allBenefits.length > 0 && (
        <div className="mb-6 flex-grow">
          <div className="mb-3 text-sm font-medium text-gray-700">포함 혜택</div>
          {basicBenefits.length > 0 && (
            <div className="mb-3">
              {basicBenefits.map((benefit, index) => (
                <span
                  key={index}
                  className="mr-2 mb-2 inline-block rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-600"
                >
                  {benefit.name}
                </span>
              ))}
            </div>
          )}

          {iconBenefits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {iconBenefits.slice(0, 6).map((benefit, index) => (
                <div
                  key={index}
                  className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <img
                    src={`/images/icons/${benefit.name}.png`}
                    alt={benefit.name}
                    className="h-8 w-8 object-contain"
                    onError={e => {
                      // 이미지 로딩 실패시 텍스트로 대체
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                  <span
                    className="hidden text-xs font-medium text-gray-600"
                    style={{ fontSize: '10px' }}
                  >
                    {benefit.name.slice(0, 2)}
                  </span>
                </div>
              ))}
              {iconBenefits.length > 6 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50">
                  <span className="text-xs font-medium text-blue-600">
                    +{iconBenefits.length - 6}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <button className="border-primary-purple text-primary-purple hover:bg-gray-30 mt-auto w-full rounded-lg border bg-white px-4 py-3 font-medium transition-colors duration-200">
        비교하기
      </button>
    </div>
  )
}

export default PlanCard
