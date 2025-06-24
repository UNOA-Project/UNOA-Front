import React, { useEffect, useState } from 'react'
import { getUserBenefits } from '@/apis/userApi'
import ArrowIcon from '@/assets/arrow-right.svg?react'
import { useAuth } from '@/contexts/AuthContext'

export const UserBenefitsSection = () => {
  const [membershipBenefits, setMembershipBenefits] = useState([])
  const [longTermBenefits, setLongTermBenefits] = useState([])
  const [planBenefits, setPlanBenefits] = useState({})
  const [benefitPages, setBenefitPages] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openCategories, setOpenCategories] = useState({})

  const imageCategories = ['프리미엄', '미디어']
  const itemsPerPage = 3

  const { user } = useAuth()

  const categoryLabels = {
    기본: '기본 혜택',
    프리미엄: '프리미엄 서비스 기본 제공(택1)',
    미디어: '미디어 서비스 기본 제공(택1)',
    스마트기기: '스마트기기 혜택',
    '시그니처/가족결합': '시그니처/가족결합 혜택',
    '피싱 해킹 안심 서비스': '피싱/해킹 안심 서비스',
  }

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const res = await getUserBenefits(user.user.name)
        setMembershipBenefits(res.membershipBenefits)
        setLongTermBenefits(res.longTermBenefits)
        setPlanBenefits(res.planBenefits)
      } catch (err) {
        setError('혜택을 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchBenefits()
  }, [])

  if (loading) return <p>로딩 중...</p>
  if (error) return <p>{error}</p>

  const groupedMembership = membershipBenefits.reduce((acc, benefit) => {
    if (!acc[benefit.category]) acc[benefit.category] = []
    acc[benefit.category].push(benefit)
    return acc
  }, {})

  const toggleCategory = category => {
    setOpenCategories(prev => {
      const newState = {}
      Object.keys(prev).forEach(key => {
        newState[key] = false
      })
      newState[category] = !prev[category]
      return newState
    })
  }

  const handleNext = (category, total) => {
    setBenefitPages(prev => ({
      ...prev,
      [category]: Math.min((prev[category] || 0) + 1, Math.floor((total - 1) / itemsPerPage)),
    }))
  }

  const handlePrev = category => {
    setBenefitPages(prev => ({
      ...prev,
      [category]: Math.max((prev[category] || 0) - 1, 0),
    }))
  }

  return (
    <div className="border-border w-[85%] overflow-hidden rounded-xl border bg-white px-5 py-10 lg:w-[70%] 2xl:w-[50%]">
      <section>
        <h2 className="mb-2 text-lg font-bold">멤버십 혜택</h2>
        {Object.entries(groupedMembership).map(([category, benefits]) => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className={`flex w-full items-center gap-5 rounded px-4 py-2 text-left text-base font-medium transition-colors ${
                openCategories[category] ? 'text-primary-purple' : 'text-text-main'
              }`}
            >
              {openCategories[category] ? (
                <ArrowIcon className="h-4 w-4 rotate-90" />
              ) : (
                <ArrowIcon className="h-4 w-4" />
              )}
              {category}
            </button>
            {openCategories[category] && (
              <div className="mt-2 grid grid-cols-1 gap-4 px-2 sm:grid-cols-4">
                {benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="border-gray-90 flex items-center gap-4 rounded-xl border p-4"
                  >
                    <div className="flex flex-col gap-y-1.5">
                      <img src={`/images/benefits/${b.brand.toLowerCase()}.png`} className="w-9" />
                      <p className="text-md font-bold">{b.brand}</p>
                      <p className="text-sm break-keep whitespace-normal text-gray-600">
                        {b.benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-xl font-bold">요금제 혜택</h2>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(planBenefits).map(([category, benefits]) =>
            benefits.length > 0 ? (
              <li
                key={category}
                className="border-gray-90 flex h-full w-full flex-col rounded-xl border px-4 py-5"
              >
                <h3 className="mb-2 text-base font-semibold">
                  {categoryLabels[category] || category}
                </h3>

                {imageCategories.includes(category) ? (
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => handlePrev(category)}
                      disabled={(benefitPages[category] || 0) === 0}
                      className="text-sm text-gray-500 disabled:opacity-30"
                    >
                      <ArrowIcon className="rotate-180" />
                    </button>
                    <ul className="flex justify-center gap-2">
                      {benefits
                        .slice(
                          (benefitPages[category] || 0) * itemsPerPage,
                          (benefitPages[category] || 0) * itemsPerPage + itemsPerPage
                        )
                        .map((b, idx) => (
                          <li key={idx}>
                            <img
                              src={`/images/icons/${b.benefit}.png`}
                              alt={b.benefit}
                              className="w-16 sm:w-16"
                            />
                          </li>
                        ))}
                    </ul>
                    <button
                      onClick={() => handleNext(category, benefits.length)}
                      disabled={
                        ((benefitPages[category] || 0) + 1) * itemsPerPage >= benefits.length
                      }
                      className="text-sm text-gray-500 disabled:opacity-30"
                    >
                      <ArrowIcon />
                    </button>
                  </div>
                ) : (
                  <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
                    {benefits.map((b, idx) => (
                      <li key={idx}>
                        <span>{b.benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : null
          )}
        </ul>
      </section>

      <section>
        {longTermBenefits.length > 0 && (
          <h2 className="mt-6 mb-2 text-xl font-bold">장기고객 혜택</h2>
        )}
        {/* <ul className="grid grid-cols-2 gap-4 px-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"> */}
        <ul className="flex flex-wrap gap-3">
          {longTermBenefits.map((b, idx) => (
            <li
              key={idx}
              className="border-gray-90 text-md flex w-full flex-col items-center gap-3 rounded-xl border px-1 py-4 text-center sm:w-[130px]"
            >
              <img src={`/images/benefits/${b.brand}.png`} className="w-16" alt="" />
              <div className="break-keep whitespace-normal">
                {b.brand ? <p className="font-bold">{b.brand}</p> : null}
                <span className="text-sm">{b.benefit}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

// 이미지 간격 넓히고 글 간격
// 장기고객 혜택 좀 더 작게
// 화살표 간격 넓게
// 로딩페이지
