import React, { useEffect, useState } from 'react'
import mascot from '@/assets/PlanCompare.png'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

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

  const Bar = ({ value, max, label, delay }) => {
    const getBarHeight = (val, maxVal) =>
      val === Infinity ? '100%' : maxVal > 0 ? `${(val / maxVal) * 100}%` : '0%'

    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative h-24 w-5 overflow-hidden rounded-md bg-gray-200">
          <motion.div
            className="absolute bottom-0 w-full bg-[#6b3ce6]"
            initial={{ height: 0 }}
            animate={{ height: getBarHeight(value, max) }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
          />
        </div>
        <span className="text-xs font-semibold text-black">
          {value === Infinity ? '무제한' : value.toLocaleString()}
        </span>
        <span className="text-[11px] font-medium text-gray-500">{label}</span>
      </div>
    )
  }

  const PlanDetailColumn = ({ plan, maxValues, onRemove, barDelayStart = 0 }) => {
    const parseValue = val =>
      typeof val === 'string' && val.includes('무제한') ? Infinity : parseFloat(val || 0)

    const price = parseInt(plan?.price || 0)
    const data = parseValue(plan?.data)

    const premiumBenefits = Array.isArray(plan?.premiumBenefit)
      ? plan?.premiumBenefit
      : [plan?.premiumBenefit]
    const mediaBenefits = Array.isArray(plan?.mediaBenefit)
      ? plan?.mediaBenefit
      : [plan?.mediaBenefit]

    return (
      <div className="flex w-full max-w-[300px] flex-col items-center gap-3 rounded-xl p-3">
        <h3 className="h-6 text-lg leading-snug font-bold break-keep text-black lg:text-2xl xl:text-3xl">
          {plan?.title}
        </h3>

        <div className="flex w-full items-start justify-around gap-4 rounded-md bg-white p-4">
          <Bar value={price} max={maxValues?.price} label="월 요금" delay={barDelayStart} />
          <Bar value={data} max={maxValues?.data} label="데이터" delay={barDelayStart + 0.1} />
        </div>

        <div className="w-full text-center text-sm text-gray-700 md:text-xl lg:text-2xl xl:text-3xl">
          <div className="mt-2 text-xs text-gray-500 md:text-xl xl:text-2xl">음성통화</div>
          <div className="font-medium whitespace-pre-line text-[#543ed9]">{plan?.voiceCall}</div>
        </div>
        <div className="w-full text-center text-sm text-gray-700 md:text-xl lg:text-2xl xl:text-3xl">
          <div className="mt-2 text-xs text-gray-500 md:text-xl xl:text-2xl">문자메시지</div>
          <div className="font-medium whitespace-pre-line text-[#543ed9]">{plan?.sms}</div>
        </div>

        <div className="min-h-[80px] w-full pt-2 text-center md:min-h-[120px]">
          <div className="mt-2 text-xs text-gray-500 md:text-xl xl:text-2xl">프리미엄 혜택</div>
          {premiumBenefits?.filter(Boolean).length > 0 ? (
            renderBenefitImages(premiumBenefits)
          ) : (
            <div className="mt-2 text-xs text-gray-400">없음</div>
          )}
        </div>

        <div className="min-h-[80px] w-full pt-2 text-center md:min-h-[120px]">
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
        <div className="flex items-center justify-center gap-2 px-4 py-2 text-base text-sm font-bold">
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

    const parseValue = val =>
      typeof val === 'string' && val.includes('무제한') ? Infinity : parseFloat(val || 0)

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
        <div className="flex w-full items-start justify-around gap-4 px-4 pt-6">
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
        >
          {isOpen ? <ExpandedView /> : <CollapsedView />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlanComparePageMobile
