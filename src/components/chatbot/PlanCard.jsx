import React from 'react'

const customScrollbarStyles = `
  /* Firefox를 위한 설정 */
  .custom-scrollbar {
    scrollbar-width: auto; /* 'thin'보다 브라우저 기본 너비 사용 */
    scrollbar-color: #d4c4e9 #F7F2FF; /* thumb 색상, track 색상 */
  }
  
  /* Chrome, Safari, Edge 등 Webkit 기반 브라우저를 위한 설정 */
  .custom-scrollbar::-webkit-scrollbar {
    height: 8px; /* 가로 스크롤바이므로 height 사용 */
    width: 8px;  /* 세로 스크롤바에도 대응 가능 */
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #F7F2FF; /* 트랙 배경색 */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d4c4e9; /* 스크롤바 막대 색상 */
    border-radius: 10px; /* 둥근 모서리 */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #7f679f; /* 마우스를 올렸을 때 색상 */
  }
`
// 요금제 하나의 상세 스펙을 보여주는 카드 컴포넌트
const PlanCard = ({ plan }) => {
  // CSS 변수가 정의되지 않았을 경우를 대비한 기본값(Fallback)
  const primaryColor = 'var(--color-primary-purple, #899df4)'
  const smallBodyFont = 'var(--text-small-body, 0.875rem)'
  const captionFont = 'var(--text-caption, 0.75rem)'

  return (
    // 카드 전체 컨테이너: 사이즈(w-64), 패딩(p-5), 내부 간격(space-y-3) 축소
    <div className="flex w-64 flex-shrink-0 flex-col space-y-3 rounded-xl bg-white p-5 shadow-md">
      {/* 1. 요금제 제목: 폰트 크기 변수 적용 */}
      <h3 style={{ fontSize: smallBodyFont }} className="truncate font-bold text-gray-900">
        {plan.title}
      </h3>

      {/* 2. 가격 정보 섹션 */}
      <div className="space-y-1">
        {/* 강조 텍스트(가격)에 색상 변수 적용 */}
        <p style={{ color: primaryColor }} className="text-lg font-bold">
          월 {plan.price.toLocaleString()}원
        </p>
        {plan.premierContractDiscount > 0 && (
          <p style={{ fontSize: captionFont, color: 'var(--color-primary-pink)' }}>
            프리미어 할인 시: 월 {(plan.price - plan.premierContractDiscount).toLocaleString()}원
          </p>
        )}
        {plan.optionalContractDiscount > 0 && (
          <p style={{ fontSize: captionFont, color: 'var(--color-primary-pink)' }}>
            선택약정 할인 시: 월 {(plan.price - plan.optionalContractDiscount).toLocaleString()}원
          </p>
        )}
      </div>

      {/* 구분선 */}
      <div className="!mt-4 border-t border-gray-200"></div>

      {/* 3. 상세 스펙 섹션: 폰트 크기 변수 적용 */}
      <div className="space-y-2" style={{ fontSize: captionFont }}>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">데이터</span>
          <span className="font-semibold text-gray-800">{plan.data || '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">음성통화</span>
          <span className="font-semibold text-gray-800">{plan.voiceCall || '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">문자</span>
          <span className="font-semibold text-gray-800">{plan.sms || '-'}</span>
        </div>
        {plan.tetheringAndSharing && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">테더링</span>
            <span className="font-semibold text-gray-800">{plan.tetheringAndSharing}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// 여러 개의 PlanCard를 감싸는 그룹 컴포넌트
const PlanCardGroup = ({ plans }) => {
  if (!plans || plans.length === 0) return null

  return (
    <>
      <style>{customScrollbarStyles}</style>
      <div className="w-full pr-4 pl-[calc(2.2rem+36px)]">
        <div className="custom-scrollbar flex space-x-4 overflow-x-auto py-4">
          {plans.map(plan => (
            <PlanCard key={plan._id || plan.title} plan={plan} />
          ))}
        </div>
      </div>
    </>
  )
}

export default PlanCardGroup
