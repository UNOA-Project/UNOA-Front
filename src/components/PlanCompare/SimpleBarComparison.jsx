import React, { useEffect, useState } from 'react'

const SimpleBarComparison = ({ planA, planB }) => {
  const parseData = value => {
    if (typeof value === 'string' && value.includes('무제한')) return Infinity
    const num = parseFloat(value)
    return isNaN(num) ? 0 : num
  }

  const priceA = parseInt(planA?.price || 0)
  const priceB = parseInt(planB?.price || 0)
  const dataA = parseData(planA?.data || 0)
  const dataB = parseData(planB?.data || 0)

  const getComparisonMax = (val1, val2) => {
    let ref = val1 === Infinity ? val2 : val1
    if (val1 === Infinity && val2 === Infinity) return 100
    if (ref <= 100) return 100
    if (ref <= 200) return 200
    if (ref <= 300) return 300
    return Math.max(val1, val2)
  }

  const maxPrice = getComparisonMax(priceA, priceB)
  const maxData = getComparisonMax(dataA, dataB)

  const getBarHeight = (value, max) => {
    if (value === Infinity) return 100
    if (max === 0) return 0
    return (value / max) * 100
  }

  const Bar = ({ value, max, label }) => {
    const finalHeight = getBarHeight(value, max)
    const [height, setHeight] = useState('0%')
    const [color, setColor] = useState('#ef4444') // 초기 빨간색

    useEffect(() => {
      const timeout = setTimeout(() => {
        setHeight(`${finalHeight}%`)
        setColor('#5b3ce6') // 보라색으로 바꿈
      }, 100)
      return () => clearTimeout(timeout)
    }, [finalHeight])

    return (
      <div className="flex w-5 flex-col items-center gap-2">
        <div className="relative h-32 w-full overflow-hidden bg-gray-200">
          <div
            className="absolute bottom-0 w-full transition-all duration-1000 ease-out"
            style={{
              height,
              backgroundColor: color,
              transition: 'height 1s ease-out, background-color 1s ease-out',
            }}
          />
        </div>
        {value === Infinity ? (
          <span className="text-xs font-bold whitespace-nowrap text-purple-700">무제한</span>
        ) : (
          <span className="text-xs font-medium text-gray-700">{value.toLocaleString()}</span>
        )}
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    )
  }

  return (
    <div className="mt-5 flex w-full flex-col items-center rounded-lg">
      <h3 className="text-xl font-bold">비교</h3>

      {/* 요금 비교 */}
      <div className="mt-7 flex w-full flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-600">요금</p>
        <div className="flex items-end gap-8">
          <Bar value={priceA} max={maxPrice} />
          <Bar value={priceB} max={maxPrice} />
        </div>
      </div>

      {/* 데이터 비교 */}
      <div className="flex w-full flex-col items-center gap-2">
        <p className="text-sm font-semibold text-gray-600">데이터</p>
        <div className="flex items-end gap-8">
          <Bar value={dataA} max={maxData} />
          <Bar value={dataB} max={maxData} />
        </div>
      </div>
    </div>
  )
}

export default SimpleBarComparison
