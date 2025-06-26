import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import AiCompareSummary from './AiCompareSummary'

const PlanComparePageMobile = () => {
  const [plans, setPlans] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const controls = useAnimation()
  const MotionButton = motion.button

  const variants = {
    closed: { y: 'calc(100% - 80px)' },
    open: { y: '0%' },
  }

  useEffect(() => {
    const updatePlans = () => {
      const stored = JSON.parse(localStorage.getItem('comparePlans')) || []
      setPlans(stored)
      if (stored.length === 0) setIsOpen(false)
    }

    updatePlans()
    window.addEventListener('compareUpdated', updatePlans)
    return () => window.removeEventListener('compareUpdated', updatePlans)
  }, [])

  const handleRemove = id => {
    const updated = plans.filter(plan => plan?._id !== id)
    setPlans(updated)
    localStorage.setItem('comparePlans', JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent('compareUpdated'))
  }

  useEffect(() => {
    if (plans.length === 0) setIsOpen(false)
    controls.start(isOpen ? 'open' : 'closed')
  }, [isOpen, controls, plans.length])

  const onDragEnd = (event, info) => {
    if (info.offset.y > 100) setIsOpen(false)
    else controls.start(isOpen ? 'open' : 'closed')
  }

  const imageBasePath = '/images/icons'
  const renderBenefitImages = (benefits, size = 'h-6 w-6') => (
    <div className="mt-2 flex flex-wrap justify-center gap-2">
      {benefits?.filter(Boolean).map((item, idx) => (
        <img key={idx} src={`${imageBasePath}/${item}.png`} alt={item} className={size} />
      ))}
    </div>
  )
  const Bar = ({ value, max, label, delay, plan }) => {
    const getBarHeight = (val, maxVal) =>
      val === Infinity ? '100%' : maxVal > 0 ? `${(val / maxVal) * 100}%` : '0%'

    return (
      <div className="flex h-40 flex-col items-center gap-1.5">
        <div className="relative h-24 w-5 overflow-hidden rounded-md bg-gray-200">
          <MotionButton
            className="absolute bottom-0 w-full bg-[#6b3ce6]"
            initial={{ height: 0 }}
            animate={{ height: getBarHeight(value, max) }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
          />
        </div>
        <span className="text-center text-xs font-semibold break-keep whitespace-normal text-black">
          {label === '데이터'
            ? plan?.data
            : value === Infinity
              ? '무제한'
              : `${value.toLocaleString()}원`}
        </span>
        <span className="text-[11px] font-medium text-gray-500">{label}</span>
      </div>
    )
  }

  const PlanDetailColumn = ({ plan, maxValues, onRemove, barDelayStart = 0 }) => {
    const parseValue = val => {
      if (!val || typeof val !== 'string') return 0
      const lower = val.toLowerCase()

      if (lower.includes('무제한')) return Infinity

      const dailyMatch = lower.match(/매일\s*(\d+)\s*gb/)
      if (dailyMatch) return parseInt(dailyMatch[1]) * 30

      const matches = lower.match(/(\d+)\s*gb/g)
      if (matches) return matches.reduce((sum, m) => sum + parseInt(m), 0)

      if (lower.includes('kb') || lower.includes('당')) return 0

      const mbMatch = lower.match(/(\d+)\s*mb/)
      if (mbMatch) return parseInt(mbMatch[1]) / 1000

      const number = parseFloat(val)
      return isNaN(number) ? 0 : number
    }

    const price = parseInt(plan?.price || 0)
    const data = parseValue(plan?.data)

    const premiumBenefits = Array.isArray(plan?.premiumBenefit)
      ? plan?.premiumBenefit
      : [plan?.premiumBenefit]
    const mediaBenefits = Array.isArray(plan?.mediaBenefit)
      ? plan?.mediaBenefit
      : [plan?.mediaBenefit]

    return (
      <div className="flex w-full max-w-[300px] flex-col items-center justify-center gap-3 rounded-xl p-4">
        <div className="flex h-14 items-start justify-center">
          <span className="text-body text-center leading-snug font-bold break-keep whitespace-normal text-black lg:text-xl">
            {plan?.title}
          </span>
        </div>

        <div className="flex w-full items-start justify-around gap-4 rounded-md bg-white p-4">
          <Bar
            plan={plan}
            value={price}
            max={maxValues?.price}
            label="월 요금"
            delay={barDelayStart}
          />
          <Bar
            plan={plan}
            value={data}
            max={maxValues?.data}
            label="데이터"
            delay={barDelayStart + 0.1}
          />
        </div>

        <div className="w-full text-center text-sm text-gray-700 md:text-xl">
          <div className="mt-2 text-xs text-gray-500 md:text-xl xl:text-2xl">음성통화</div>
          <div className="min-h-[28px] font-medium whitespace-pre-line text-[#543ed9]">
            {plan?.voiceCall?.trim() ? (
              plan.voiceCall
            ) : (
              <span className="text-xs text-gray-400">없음</span>
            )}
          </div>
        </div>

        <div className="w-full text-center text-sm text-gray-700 md:text-xl">
          <div className="mt-2 text-xs text-gray-500 md:text-xl xl:text-2xl">문자메시지</div>
          <div className="min-h-[28px] font-medium whitespace-pre-line text-[#543ed9]">
            {plan?.sms?.trim() ? plan.sms : <span className="text-xs text-gray-400">없음</span>}
          </div>
        </div>

        <div className="max-h-[120px] min-h-[120px] w-full pt-2 text-center md:min-h-[120px]">
          <div className="mt-2 text-xs text-gray-500 md:text-xl xl:text-2xl">프리미엄 혜택</div>
          {premiumBenefits?.filter(Boolean).length > 0 ? (
            renderBenefitImages(premiumBenefits)
          ) : (
            <div className="mt-2 text-xs text-gray-400">없음</div>
          )}
        </div>

        <div className="min-h-[90px] w-full pt-2 text-center md:min-h-[120px]">
          <div className="mt-2 text-xs text-gray-500 md:text-xl xl:text-2xl">미디어 혜택</div>
          {mediaBenefits?.filter(Boolean).length > 0 ? (
            renderBenefitImages(mediaBenefits)
          ) : (
            <div className="mt-2 text-xs text-gray-400">없음</div>
          )}
        </div>
        <div className="mt-auto w-full pt-0">
          <button
            onClick={() => onRemove(plan?._id)}
            className="w-full rounded-md border border-gray-300 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-200"
          >
            삭제하기
          </button>
        </div>
      </div>
    )
  }

  const CollapsedView = () => (
    <div
      onClick={() => {
        if (plans.length >= 1) setIsOpen(true)
      }}
      className={`flex h-[80px] w-full items-center ${
        plans.length === 2 ? 'justify-center' : 'justify-between'
      } px-6 ${plans.length >= 1 ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {plans.length === 2 ? (
        <div className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold">
          선택된 요금제 비교하기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      ) : (
        <div className="w-full text-center font-semibold text-gray-500">
          <span className="font-bold text-purple-600">'{plans[0]?.title}'</span> 선택됨. 비교할
          요금제를 추가해주세요.
        </div>
      )}
    </div>
  )

  const ExpandedView = () => {
    const getComparisonMax = (a, b) => {
      let referenceValue
      if (a === Infinity || b === Infinity) {
        if (a === Infinity && b === Infinity) return 100
        referenceValue = a === Infinity ? b : a
      } else {
        referenceValue = Math.max(a, b)
      }
      if (referenceValue <= 100) return 100
      if (referenceValue <= 200) return 200
      if (referenceValue <= 300) return 300
      return referenceValue
    }

    const parseValue = val => {
      if (!val || typeof val !== 'string') return 0
      const lower = val.toLowerCase()

      if (lower.includes('무제한')) return Infinity

      const dailyMatch = lower.match(/매일\s*(\d+)\s*gb/)
      if (dailyMatch) return parseInt(dailyMatch[1]) * 20

      const matches = lower.match(/(\d+)\s*gb/g)
      if (matches) return matches.reduce((sum, m) => sum + parseInt(m), 0)

      if (lower.includes('kb') || lower.includes('당')) return 0

      const mbMatch = lower.match(/(\d+)\s*mb/)
      if (mbMatch) return parseInt(mbMatch[1]) / 1000

      const number = parseFloat(val)
      return isNaN(number) ? 0 : number
    }

    const priceA = parseInt(plans[0]?.price || 0)
    const priceB = parseInt(plans[1]?.price || 0)
    const dataA = parseValue(plans[0]?.data)
    const dataB = parseValue(plans[1]?.data)

    const maxValues = {
      price: getComparisonMax(priceA, priceB),
      data: getComparisonMax(dataA, dataB),
    }

    return (
      <div className="flex h-full flex-col overflow-y-auto pb-6">
        <div className="sticky top-0 z-10 bg-white pt-2 pb-4">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-gray-300" />
          <div className="flex items-center justify-between px-4 pt-4">
            <h2 className="text-center text-lg font-bold">요금제 비교</h2>
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
        <div className="px-4 py-2">
          <AiCompareSummary plans={plans} />
        </div>
        <div className="flex w-full items-start justify-around gap-4 px-4 pt-2">
          {plans.map((plan, idx) => (
            <PlanDetailColumn
              key={plan._id}
              plan={plan}
              maxValues={maxValues}
              onRemove={handleRemove}
              barDelayStart={idx * 0.2}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {plans.length > 0 && (
        <motion.div
          className="shadow-t-2xl fixed right-0 bottom-0 left-0 z-50 h-full w-full rounded-t-2xl border-t bg-white sm:block xl:hidden"
          variants={variants}
          initial="closed"
          animate={controls}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag={plans.length >= 1 ? 'y' : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={onDragEnd}
          data-mobile-compare-expanded={isOpen}
        >
          {isOpen ? <ExpandedView /> : <CollapsedView />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlanComparePageMobile
