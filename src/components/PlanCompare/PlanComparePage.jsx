import React, { useEffect, useState } from 'react'
import mascot from '@/assets/PlanCompare.png'
import SimpleBarComparison from './SimpleBarComparison'

const PlanComparePage = () => {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    const updatePlans = () => {
      const stored = JSON.parse(localStorage.getItem('comparePlans')) || []
      setPlans(stored)
    }

    updatePlans()
    window.addEventListener('compareUpdated', updatePlans)
    return () => window.removeEventListener('compareUpdated', updatePlans)
  }, [])

  const handleRemove = id => {
    const updated = plans.filter(plan => plan.id !== id)
    setPlans(updated)
    localStorage.setItem('comparePlans', JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent('compareUpdated'))
  }

  const renderEmptyCard = key => (
    <div
      key={key}
      className="flex h-full w-full max-w-[400px] flex-1 items-center justify-center rounded-xl p-6 text-center text-gray-400"
    >
      <p className="mt-8 text-lg">비교할 요금제를 추가하세요</p>
    </div>
  )

  const imageBasePath = '/images/icons'
  const renderBenefitImages = (benefits, align = 'left') => (
    <div className={`flex flex-wrap gap-2 ${align === 'left' ? 'justify-start' : 'justify-end'}`}>
      {benefits.filter(Boolean).map((item, idx) => (
        <img
          key={idx}
          src={`${imageBasePath}/${item}.png`}
          alt={item}
          className="h-8 w-auto rounded-md"
        />
      ))}
    </div>
  )

  const PlanColumn = ({ plan, align }) => {
    const premiumBenefits = Array.isArray(plan.premiumBenefit)
      ? plan.premiumBenefit
      : [plan.premiumBenefit]
    const mediaBenefits = Array.isArray(plan.mediaBenefit) ? plan.mediaBenefit : [plan.mediaBenefit]

    return (
      <div
        className={`mx-5 flex w-full max-w-[350px] flex-1 flex-col rounded-xl p-4 text-black ${
          align === 'left' ? 'items-start text-left' : 'items-end text-right'
        }`}
        key={plan.id}
      >
        <h3 className="mb-0 text-[2rem] font-bold text-black sm:text-2xl md:text-3xl">
          {plan.title}
        </h3>

        <div className="mt-10 w-full">
          <span className="text-[1.1rem] font-semibold">월 </span>
          <span className="text-[1.3rem] font-semibold text-[#543ed9]">
            {parseInt(plan.price).toLocaleString()}원
          </span>
          <hr className="my-4 border-t-2 border-gray-300" />
        </div>

        <div className="w-full">
          <div className="text-[1.1rem] font-semibold">데이터</div>
          <div className="text-[1.1rem] font-semibold text-[#543ed9]">
            <span className="text-[0.9rem] font-bold text-black">월 </span>
            {plan.data}
          </div>
          <hr className="my-4 border-t-2 border-gray-300" />
        </div>

        <div className="w-full">
          <div className="text-[1.1rem] font-semibold">음성통화</div>
          <div className="text-[1.1rem] font-semibold text-[#543ed9]">{plan.voiceCall}</div>
          <hr className="my-4 border-t-2 border-gray-300" />
        </div>

        <div className="w-full">
          <div className="text-[1.1rem] font-semibold">문자메시지</div>
          <div className="text-[1.1rem] font-semibold text-[#543ed9]">{plan.sms}</div>
          <hr className="my-4 border-t-2 border-gray-300" />
        </div>

        <div className="w-full">
          <div className="text-[1.1rem] font-semibold">미디어 혜택</div>
          <div className="text-[1.1rem] font-semibold text-[#543ed9]">
            총 {mediaBenefits.filter(Boolean).length}개
          </div>
          <div className="mt-2">{renderBenefitImages(mediaBenefits, align)}</div>
        </div>

        <div className="mt-auto w-full">
          <div className="mt-6 w-full">
            <div className="text-[1.1rem] font-semibold">프리미엄 혜택</div>
            <div className="text-[1.1rem] font-semibold text-[#543ed9]">
              총 {premiumBenefits.filter(Boolean).length}개
            </div>
            <div className="mt-2">{renderBenefitImages(premiumBenefits, align)}</div>
          </div>

          <button
            className="mt-8 rounded-[16px] border border-[#6b3ce6] px-20 py-3 text-sm text-[#6b3ce6] transition hover:bg-[#f2edff]"
            onClick={() => handleRemove(plan.id)}
          >
            삭제하기
          </button>
        </div>
      </div>
    )
  }

  const renderEmptyState = () => (
    <div className="flex h-[70vh] flex-col items-center justify-center rounded-xl px-4 py-12 text-center">
      <img src={mascot} alt="요금제 캐릭터" className="mb-4 w-[120px]" />
      <p className="text-center text-[1rem] font-semibold text-[#333]">
        비교하고 싶은 요금제를 두 개 골라주세요!
      </p>
    </div>
  )

  const left = plans[0] ? <PlanColumn plan={plans[0]} align="left" /> : renderEmptyCard('left')
  const right = plans[1] ? <PlanColumn plan={plans[1]} align="right" /> : renderEmptyCard('right')

  return (
    <section className="mx-auto flex min-h-screen w-1/2 flex-col items-center bg-[rgba(178,141,255,0.1)] px-6 py-24 text-center">
      <h2 className="mt-5 mb-4 text-[1.4rem] font-bold">요금제 비교하기</h2>
      <hr className="mr-20 mb-12 ml-20 w-[100%] border-t-[2px] border-gray-300" />

      {plans.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="flex w-full items-stretch justify-center gap-4 lg:gap-8">
          <div className="flex flex-1 justify-end">{left}</div>
          <div className="flex w-20 flex-shrink-0 justify-center">
            {plans.length === 2 && <SimpleBarComparison planA={plans[0]} planB={plans[1]} />}
          </div>
          <div className="flex flex-1 justify-start">{right}</div>
        </div>
      )}
    </section>
  )
}

export default PlanComparePage
