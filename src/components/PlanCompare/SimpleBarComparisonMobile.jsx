import React from 'react'
import { motion } from 'framer-motion'

const SimpleBarComparisonMobile = ({ planA, planB }) => {
  const parseValue = val =>
    typeof val === 'string' && val.includes('무제한') ? Infinity : parseFloat(val || 0)

  const priceA = parseInt(planA?.price || 0)
  const priceB = parseInt(planB?.price || 0)
  const dataA = parseValue(planA?.data)
  const dataB = parseValue(planB?.data)

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

  const maxPrice = getComparisonMax(priceA, priceB)
  const maxData = getComparisonMax(dataA, dataB)

  const getBarHeight = (val, max) =>
    val === Infinity ? '100%' : max > 0 ? `${(val / max) * 100}%` : '0%'

  const Bar = ({ value, max, label, delay }) => (
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

  return (
    <div className="w-full rounded-xl bg-gray-50 p-4">
      <div className="flex w-full flex-row items-center gap-6">
        <div className="flex flex-col items-center">
          <h4 className="mb-2 text-base font-semibold text-black">요금</h4>
          <div className="flex justify-center gap-6">
            <Bar value={priceA} max={maxPrice} label={planA.title} delay={0} />
            <Bar value={dataA} max={maxData} label={planA.title} delay={0.2} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="mb-2 text-base font-semibold text-black">데이터</h4>
          <div className="flex justify-center gap-6">
            <Bar value={priceB} max={maxPrice} label={planB.title} delay={0.1} />
            <Bar value={dataB} max={maxData} label={planB.title} delay={0.3} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleBarComparisonMobile
