import React, { useEffect, useState } from 'react'
import mascot from '@/assets/PlanCompare.png'
import SimpleBarComparison from './SimpleBarComparisonMobile'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

// --- UI 개선: 바텀 시트(Bottom Sheet) 형태의 모바일 비교 컴포넌트 ---

const PlanComparePageMobile = () => {
  const [plans, setPlans] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const controls = useAnimation()

  const variants = {
    closed: { y: 'calc(100% - 80px)' },
    open: { y: '0%' },
  }

  useEffect(() => {
    const updatePlans = () => {
      const stored = JSON.parse(localStorage.getItem('comparePlans')) || []
      setPlans(stored)
      if (stored.length < 2) {
        setIsOpen(false)
      }
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

  useEffect(() => {
    if (plans.length < 2) {
      setIsOpen(false)
    }
    controls.start(isOpen ? 'open' : 'closed')
  }, [isOpen, controls, plans.length])

  const onDragEnd = (event, info) => {
    if (plans.length === 2) {
      if (info.offset.y > 100) {
        setIsOpen(false)
      } else {
        controls.start(isOpen ? 'open' : 'closed')
      }
    } else {
      controls.start('closed')
    }
  }

  const imageBasePath = '/images/icons'
  const renderBenefitImages = (benefits, size = 'h-6 w-6') => (
    <div className="mt-2 flex flex-wrap justify-center gap-2">
      {benefits.filter(Boolean).map((item, idx) => (
        <img key={idx} src={`${imageBasePath}/${item}.png`} alt={item} className={size} />
      ))}
    </div>
  )

  // --- [수정] CompactPlan 컴포넌트의 삭제 버튼 위치 및 스타일 변경 ---
  const CompactPlan = ({ plan, onRemove }) => (
    <div className="flex w-full max-w-[160px] flex-col items-center rounded-lg p-4 text-sm text-gray-700">
      {/* 상단 아이콘 버튼은 제거됨 */}
      <h3 className="mb-2 h-10 text-center text-base leading-snug font-bold break-keep text-black">
        {plan.title}
      </h3>
      <div className="font-semibold whitespace-nowrap text-[#543ed9]">
        월 {parseInt(plan.price).toLocaleString()}원
      </div>
      <div className="mt-4 text-center text-xs text-gray-500">데이터</div>
      <div className="font-medium text-[#543ed9]">{plan.data}</div>
      <div className="mt-2 text-center text-xs text-gray-500">음성통화</div>
      <div className="text-center font-medium whitespace-pre-line text-[#543ed9]">
        {plan.voiceCall}
      </div>
      <div className="mt-2 text-center text-xs text-gray-500">문자메시지</div>
      <div className="font-medium text-[#543ed9]">{plan.sms}</div>

      {/* 맨 아래에 텍스트 버튼으로 추가 */}
      <button
        onClick={() => onRemove(plan.id)}
        className="mt-4 w-full rounded-md border border-gray-300 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-200"
      >
        삭제하기
      </button>
    </div>
  )

  const CollapsedView = () => (
    <div
      onClick={() => {
        if (plans.length === 2) setIsOpen(true)
      }}
      className={`flex h-[80px] w-full items-center justify-between px-6 ${
        plans.length === 2 ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {plans.length === 2 ? (
        <>
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="max-w-[100px] truncate text-sm font-semibold text-gray-600">
              {plans[0]?.title}
            </span>
            <span className="text-xs text-gray-400">vs</span>
            <span className="max-w-[100px] truncate text-sm font-semibold text-gray-600">
              {plans[1]?.title}
            </span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2 rounded-full bg-[#6b3ce6] px-4 py-2 text-sm font-bold text-white">
            비교하기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </>
      ) : (
        <div className="w-full text-center font-semibold text-gray-500">
          <span className="font-bold text-purple-600">'{plans[0]?.title}'</span> 선택됨. 비교할
          요금제를 추가해주세요.
        </div>
      )}
    </div>
  )

  const ExpandedView = () => (
    <div className="flex h-full flex-col overflow-y-auto pb-6">
      <div className="sticky top-0 z-10 bg-white pt-2 pb-4">
        <div className="mx-auto h-1.5 w-10 rounded-full bg-gray-300" />
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-lg font-bold">요금제 비교</h2>
          <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-4">
        <div className="rounded-xl bg-gray-50 p-4">
          {plans.length === 2 && <SimpleBarComparison planA={plans[0]} planB={plans[1]} />}
        </div>
        <div className="my-4 flex w-full items-start justify-around gap-4 border-t border-gray-200 pt-6">
          {plans.length === 2 && (
            <>
              <CompactPlan plan={plans[0]} onRemove={handleRemove} />
              <CompactPlan plan={plans[1]} onRemove={handleRemove} />
            </>
          )}
        </div>
        {[
          [plans[0]?.premiumBenefit, '프리미엄 혜택', 'left'],
          [plans[1]?.premiumBenefit, '프리미엄 혜택', 'right'],
          [plans[0]?.mediaBenefit, '미디어 혜택', 'left'],
          [plans[1]?.mediaBenefit, '미디어 혜택', 'right'],
        ].map(
          ([benefits, title, align], idx) =>
            Array.isArray(benefits) &&
            benefits.filter(Boolean).length > 0 && (
              <div
                key={idx}
                className={`rounded-xl p-4 ${
                  align === 'left' ? 'bg-purple-50 text-left' : 'bg-blue-50 text-right'
                }`}
              >
                <p className="mb-2 font-semibold">
                  {title}{' '}
                  <span className="text-xs font-normal">
                    ({align === 'left' ? plans[0]?.title : plans[1]?.title})
                  </span>
                </p>
                {renderBenefitImages(benefits.filter(Boolean), 'h-8 w-8')}
              </div>
            )
        )}
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {plans.length > 0 && (
        <motion.div
          className="shadow-t-2xl fixed right-0 bottom-0 left-0 z-50 h-full w-full rounded-t-2xl border-t bg-white md:hidden"
          variants={variants}
          initial="closed"
          animate={controls}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag={plans.length === 2 ? 'y' : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={onDragEnd}
        >
          {isOpen ? <ExpandedView /> : <CollapsedView />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlanComparePageMobile
