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
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
      <div className="relative h-20 w-4 overflow-hidden rounded-md bg-gray-200 sm:h-24 sm:w-5 md:h-28 md:w-6 lg:h-32 lg:w-7 xl:h-40 xl:w-8">
        <motion.div
          className="absolute bottom-0 w-full bg-[#6b3ce6]"
          initial={{ height: 0 }}
          animate={{ height: getBarHeight(value, max) }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </div>
      <span className="text-[10px] font-semibold text-black sm:text-xs md:text-sm lg:text-base">
        {value === Infinity ? '무제한' : value.toLocaleString()}
      </span>
      <span className="text-[9px] text-gray-500 sm:text-[11px] md:text-sm">{label}</span>
    </div>
  )

  return (
    <div className="w-full rounded-xl bg-gray-50 p-4">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* A 요금제 */}
        <div className="flex flex-col items-center">
          <h4 className="mb-2 max-w-[160px] truncate text-center text-sm font-semibold text-black sm:text-base">
            {planA.title}
          </h4>
          <div className="flex justify-center gap-6 sm:gap-8">
            <Bar value={priceA} max={maxPrice} delay={0} label="요금" />
            <Bar value={dataA} max={maxData} delay={0.2} label="데이터" />
          </div>
        </div>

        {/* B 요금제 */}
        <div className="flex flex-col items-center">
          <h4 className="mb-2 max-w-[160px] truncate text-center text-sm font-semibold text-black sm:text-base">
            {planB.title}
          </h4>
          <div className="flex justify-center gap-6 sm:gap-8">
            <Bar value={priceB} max={maxPrice} delay={0.1} label="요금" />
            <Bar value={dataB} max={maxData} delay={0.3} label="데이터" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleBarComparisonMobile
