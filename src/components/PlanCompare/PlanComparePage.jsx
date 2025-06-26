import { useEffect, useState } from 'react'
import mascot from '@/assets/PlanCompare.png'
import { motion } from 'framer-motion'
import AiCompareSummary from './AiCompareSummary'

const PlanComparePage = () => {
  const [plans, setPlans] = useState([])
  const Motion = motion.div

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
    const updated = plans.filter(plan => plan._id !== id)
    setPlans(updated)
    localStorage.setItem('comparePlans', JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent('compareUpdated'))
  }

  const imageBasePath = '/images/icons'
  const renderBenefitImages = (benefits, size = 'h-6 w-6') => (
    <div className="mt-2 flex flex-wrap justify-center gap-2">
      {benefits?.filter(Boolean).map((item, idx) => (
        <img key={idx} src={`${imageBasePath}/${item}.png`} alt={item} className={size} />
      ))}
    </div>
  )

  const PlanColumn = ({ plan }) => {
    const parseValue = val => {
      if (!val || typeof val !== 'string') return 0
      const lower = val.toLowerCase()

      if (lower.includes('무제한')) return Infinity

      const matches = lower.match(/(\d+)\s*gb/g)
      if (matches) {
        const total = matches.reduce((sum, m) => sum + parseInt(m), 0)
        return total
      }

      const dailyMatch = lower.match(/매일\s*(\d+)\s*gb/)
      if (dailyMatch) {
        return parseInt(dailyMatch[1]) * 30
      }

      if (lower.includes('kb') || lower.includes('당')) return 0

      const mbMatch = lower.match(/(\d+)\s*mb/)
      if (mbMatch) {
        return parseInt(mbMatch[1]) / 1000
      }

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

    const otherPlan = plans.find(p => p._id !== plan._id)
    const otherPrice = parseInt(otherPlan?.price || 0)
    const otherData = parseValue(otherPlan?.data)

    const getComparisonMax = (a, b, isData = false) => {
      let referenceValue
      if (a === Infinity || b === Infinity) {
        if (a === Infinity && b === Infinity) return 100
        referenceValue = a === Infinity ? b : a
      } else {
        referenceValue = Math.max(a, b)
      }

      if (referenceValue <= 100) return isData ? 100 : 100
      if (referenceValue <= 200) return isData ? 200 : 200
      if (referenceValue <= 300) return isData ? 300 : 300
      return referenceValue
    }

    const maxPrice = getComparisonMax(price, otherPrice)
    const maxData = getComparisonMax(data, otherData, true)

    const getBarHeight = (val, maxVal) =>
      val === Infinity ? '100%' : maxVal > 0 ? `${(val / maxVal) * 100}%` : '0%'

    const Bar = ({ value, max, label, delay }) => (
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative h-24 w-5 overflow-hidden rounded-md bg-gray-200">
          <Motion
            className="absolute bottom-0 w-full bg-[#6b3ce6]"
            initial={{ height: 0 }}
            animate={{ height: getBarHeight(value, max) }}
            transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1], delay }}
          />
        </div>
        <span className="lg:text-small-body text-xs font-semibold text-black">
          {label === '데이터'
            ? plan?.data
            : value === Infinity
              ? '무제한'
              : `${value.toLocaleString()}원`}
        </span>
        <span className="text-[11px] font-medium text-gray-500">{label}</span>
      </div>
    )

    return (
      <div className="mx-5 flex w-full max-w-[350px] flex-1 flex-col items-center rounded-xl p-4 text-black">
        <h3 className="h-18 text-center text-sm leading-snug font-bold break-keep whitespace-normal text-black lg:text-2xl">
          {plan?.title}
        </h3>

        <div className="flex w-full items-start justify-around gap-4 rounded-md p-3">
          <Bar value={price} max={maxPrice} label="월 요금" delay={0} />
          <Bar value={data} max={maxData} label="데이터" delay={0.2} />
        </div>

        <div className="w-full text-center text-sm text-gray-700 md:text-xl">
          <div className="mt-8 text-xs text-gray-500 md:text-base lg:text-lg xl:text-xl">
            음성통화
          </div>
          <div className="min-h-[28px] text-2xl font-medium whitespace-pre-line text-[#543ed9]">
            {plan?.voiceCall?.trim() ? (
              plan.voiceCall
            ) : (
              <span className="text-sm text-gray-400">없음</span>
            )}
          </div>
        </div>
        <div className="w-full text-center text-sm text-gray-700 lg:text-2xl">
          <div className="mt-10 text-xs text-gray-500 md:text-base lg:text-lg xl:text-xl">
            문자메시지
          </div>
          <div className="min-h-[28px] text-2xl font-medium whitespace-pre-line text-[#543ed9]">
            {plan?.sms?.trim() ? plan.sms : <span className="text-sm text-gray-400">없음</span>}
          </div>
        </div>

        <div className="mt-10 min-h-[120px] w-full pt-2 text-center">
          <div className="text-xs text-gray-500 md:text-base lg:text-lg xl:text-xl">
            프리미엄 혜택
          </div>
          {premiumBenefits?.filter(Boolean).length > 0 ? (
            renderBenefitImages(premiumBenefits)
          ) : (
            <div className="mt-2 text-xs text-gray-400">없음</div>
          )}
        </div>

        <div className="min-h-[90px] w-full pt-2 text-center">
          <div className="text-xs text-gray-500 md:text-base lg:text-lg xl:text-xl">
            미디어 혜택
          </div>
          {mediaBenefits?.filter(Boolean).length > 0 ? (
            renderBenefitImages(mediaBenefits)
          ) : (
            <div className="mt-2 text-xs text-gray-400">없음</div>
          )}
        </div>

        <div className="mt-auto w-full pt-3">
          <button
            onClick={() => handleRemove(plan?._id)}
            className="w-full rounded-md border border-gray-300 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-200"
          >
            삭제하기
          </button>
        </div>
      </div>
    )
  }

  const renderEmptyCard = key => (
    <div
      key={key}
      className="flex h-full w-full max-w-[400px] flex-1 items-center justify-center rounded-xl p-6 text-center text-gray-400"
    >
      <p className="mt-8 text-lg">비교할 요금제를 추가하세요</p>
    </div>
  )

  const renderEmptyState = () => (
    <div className="flex h-[70vh] flex-col items-center justify-center rounded-xl px-4 py-12 text-center">
      <img src={mascot} alt="요금제 캐릭터" className="mb-4 w-[120px]" />
      <p className="text-center text-[1rem] font-semibold text-[#333]">
        비교하고 싶은 요금제를 두 개 골라주세요!
      </p>
    </div>
  )

  const left = plans[0] ? <PlanColumn plan={plans[0]} /> : renderEmptyCard('left')
  const right = plans[1] ? <PlanColumn plan={plans[1]} /> : renderEmptyCard('right')

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex h-full w-full flex-col overflow-y-auto bg-white px-4 py-8 md:px-6 md:py-12"
    >
      <h2 className="mt-15 mb-4 text-left text-base font-bold sm:text-lg lg:text-xl xl:text-2xl">
        요금제 비교하기
      </h2>
      <hr className="mb-6 w-full border-t-[2px] border-gray-300" />

      <div className="mb-8">
        <AiCompareSummary plans={plans} />
      </div>

      {plans.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="flex flex-col gap-8 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-1 justify-center lg:justify-end">{left}</div>
          <div className="flex flex-1 justify-center lg:justify-start">{right}</div>
        </div>
      )}
    </motion.section>
  )
}

export default PlanComparePage
