import React from 'react'
import sharingImg from '/images/icons/proicons_arrow.png'
import callImg from '/images/icons/call.png'
import messageImg from '/images/icons/message.png'
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

    // basic benefit는 텍스트로만 표시
    if (plan.basicBenefit) {
      benefits.push({ name: plan.basicBenefit, type: 'basic' })
    }

    // premium과 media benefit은 아이콘으로 표시
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

    const regex = /(\d+(?:\.\d+)?(?:GB|MB|TB|KB|분|초|원|건|회|개|무제한))/g
    return text.split(regex).map((part, index) => {
      if (/^\d+(?:\.\d+)?(?:GB|MB|TB|KB|분|초|원|건|회|개)$/.test(part) || part === '무제한') {
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
    <div className="flex max-w-75 min-w-75 flex-col rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-xl">
      {/* 제목 */}
      <h3 className="mb-6 text-center text-lg leading-tight font-bold text-gray-900">
        {plan.title}
      </h3>
      <hr className="mb-4 border-gray-200" />

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
      <div className="mb-6">
        <div className="mb-4 flex items-center">
          <div className="mr-2 flex items-center text-sm text-gray-700">데이터:</div>
          <div className="flex items-center text-sm font-medium">{highlightNumbers(plan.data)}</div>
        </div>

        <hr className="mb-4 border-gray-200" />

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <div className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <img src={sharingImg} alt="셰어링이미지" />
              </div>
            </div>
            <div className="mb-1 text-xs text-gray-600">나눠쓰기</div>
            <div className="text-sm font-medium text-gray-900">{plan.tethering || '없음'}</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <div className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <img src={callImg} alt="전화이미지" />
              </div>
            </div>
            <div className="mb-1 text-xs text-gray-600">음성</div>
            <div className="text-sm font-medium text-gray-900">{plan.voiceCall || '없음'}</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <div className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <img src={messageImg} alt="메세지이미지" />
              </div>
            </div>
            <div className="mb-1 text-xs text-gray-600">메시지</div>
            <div className="text-sm font-medium text-gray-900">{plan.sms || '없음'}</div>
          </div>
        </div>
        {basicBenefits.length > 0 ? <hr className="mt-4 border-gray-200" /> : ''}
      </div>

      {/* 포함 혜택 섹션 */}
      {allBenefits.length > 0 && (
        <div className="mb-6 flex-grow">
          <div className="mb-3 text-sm font-medium text-gray-700">포함 혜택</div>

          {/* Basic benefits (텍스트 형태) */}
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

          {/* Premium & Media benefits (아이콘 형태) */}
          {iconBenefits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {iconBenefits.slice(0, 6).map((benefit, index) => (
                <div
                  key={index}
                  className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  title={benefit.name}
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
                  {/* 커스텀 툴팁 */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {benefit.name}
                    <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-gray-800"></div>
                  </div>
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

      {/* 버튼 */}
      <button className="mt-auto w-full rounded-lg border border-blue-600 bg-white px-4 py-3 font-medium text-blue-600 transition-colors duration-200 hover:bg-gray-50">
        비교하기
      </button>
    </div>
  )
}

export default PlanCard
