// 스크롤바를 위한 커스텀 CSS 스타일
const customScrollbarStyles = `
  .custom-scrollbar { scrollbar-width: auto; scrollbar-color: #d4c4e9 #F7F2FF; }
  .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: #F7F2FF; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d4c4e9; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #7f679f; }
`

const SpecValue = ({ text }) => {
  // 데이터가 없으면 '-'를 표시합니다.
  if (!text) {
    return <span className="font-semibold text-gray-800">-</span>
  }

  // `break-keep`을 사용하여 한글 단어 잘림을 방지
  return <span className="text-right font-semibold break-keep text-gray-800">{text}</span>
}

// 요금제 하나의 상세 정보를 보여주는 카드 컴포넌트
const PlanCard = ({ plan }) => {
  const primaryColor = 'var(--color-primary-purple)'
  const pinkColor = 'var(--color-primary-pink)'
  const smallBodyFont = 'var(--text-small-body)'
  const captionFont = 'var(--text-caption)'

  return (
    // 카드 전체 컨테이너: 사이즈(w-64), 패딩(p-5), 내부 간격(space-y-3) 축소
    <div className="ml-3 flex w-64 flex-shrink-0 flex-col space-y-3 rounded-xl bg-white p-5 shadow-md">
      {/* 1. 요금제 제목 */}
      <h3 style={{ fontSize: smallBodyFont }} className="truncate font-bold text-gray-900">
        {plan.title}
      </h3>

      {/* 2. 가격 정보 섹션 */}
      <div className="space-y-1">
        <p style={{ color: primaryColor }} className="text-lg font-bold">
          월 {plan.price.toLocaleString()}원
        </p>
        {plan.premierContractDiscount > 0 && (
          <p style={{ fontSize: captionFont, color: pinkColor }}>
            프리미어 할인 시: 월 {(plan.price - plan.premierContractDiscount).toLocaleString()}원
          </p>
        )}
        {plan.optionalContractDiscount > 0 && (
          <p style={{ fontSize: captionFont, color: pinkColor }}>
            선택약정 할인 시: 월 {(plan.price - plan.optionalContractDiscount).toLocaleString()}원
          </p>
        )}
      </div>

      {/* 구분선 */}
      <div className="!mt-4 border-t border-gray-200"></div>

      {/* 3. 상세 스펙 섹션 */}
      <div className="space-y-2" style={{ fontSize: captionFont }}>
        <div className="flex items-start justify-between gap-2">
          <span className="font-medium break-keep text-gray-500">데이터</span>
          <SpecValue text={plan.data} />
        </div>
        <div className="flex items-start justify-between gap-2">
          <span className="font-medium break-keep text-gray-500">음성통화</span>
          <SpecValue text={plan.voiceCall} />
        </div>
        <div className="flex items-start justify-between gap-2">
          <span className="font-medium break-keep text-gray-500">문자</span>
          <SpecValue text={plan.sms} />
        </div>
        {plan.tetheringAndSharing && (
          <div className="flex items-start justify-between gap-2">
            <span className="font-medium break-keep text-gray-500">테더링 쉐어링</span>
            <SpecValue text={plan.tetheringAndSharing} />
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
      <div className="w-full pr-4 pl-[calc(1rem+36px+0.5rem)]">
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
