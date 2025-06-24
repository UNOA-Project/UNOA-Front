import { useEffect, useState } from 'react'
import { getUserBenefits } from '@/apis/userApi'
import ArrowIcon from '@/assets/arrow-right.svg?react'
import { useAuth } from '@/contexts/AuthContext'
import LoadingScreen from '@/components/chatbot/LoadingScreen'

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
  }, [user])

  if (loading) return <LoadingScreen />
  if (error) return <p>{error}</p>

  const groupedMembership = membershipBenefits.reduce((acc, benefit) => {
    acc[benefit.category] = acc[benefit.category] || []
    acc[benefit.category].push(benefit)
    return acc
  }, {})

  const toggleCategory = category => {
    setOpenCategories(prev => ({
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false])),
      [category]: !prev[category],
    }))
  }

  const paginate = (category, direction, total) => {
    setBenefitPages(prev => {
      const current = prev[category] || 0
      const maxPage = Math.floor((total - 1) / itemsPerPage)
      const next = direction === 'next' ? Math.min(current + 1, maxPage) : Math.max(current - 1, 0)
      return { ...prev, [category]: next }
    })
  }

  return (
    <div className="border-border w-[85%] overflow-hidden rounded-xl border bg-white px-5 py-10 lg:w-[70%] 2xl:w-[50%]">
      <section>
        <h2 className="mb-3 text-lg font-bold">멤버십 혜택</h2>
        {Object.entries(groupedMembership).map(([category, benefits]) => (
          <div key={category} className="mb-5">
            <button
              onClick={() => toggleCategory(category)}
              className={`flex w-full items-center gap-4 rounded text-left text-base font-medium transition-colors ${
                openCategories[category] ? 'text-primary-purple' : 'text-text-main'
              }`}
            >
              <ArrowIcon className={`h-3 w-3 ${openCategories[category] ? 'rotate-90' : ''}`} />
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
                      <p className="text-base font-bold">{b.brand}</p>
                      <p className="text-sm break-keep whitespace-normal text-gray-700">
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
        <h2 className="mb-3 text-lg font-bold">요금제 혜택</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(planBenefits).map(([category, benefits]) =>
            benefits.length > 0 ? (
              <li
                key={category}
                className="border-gray-90 flex h-full flex-col rounded-xl border px-4 py-5"
              >
                <h3 className="mb-2 text-base font-semibold">
                  {categoryLabels[category] || category}
                </h3>
                {imageCategories.includes(category) ? (
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => paginate(category, 'prev')}
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
                      onClick={() => paginate(category, 'next', benefits.length)}
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
                      <li key={idx}>{b.benefit}</li>
                    ))}
                  </ul>
                )}
              </li>
            ) : null
          )}
        </ul>
      </section>

      <section className="mt-6">
        {longTermBenefits.length > 0 && (
          <h2 className="mt-3 mb-2 text-lg font-bold">장기고객 혜택</h2>
        )}
        <ul className="flex flex-wrap gap-3">
          {longTermBenefits.map((b, idx) => (
            <li
              key={idx}
              className="border-gray-90 text-md flex w-full flex-col items-center gap-3 rounded-xl border px-1 py-4 text-center sm:w-33"
            >
              <img src={`/images/benefits/${b.brand}.png`} className="w-16" alt="" />
              <div className="break-keep whitespace-normal">
                {b.brand && <p className="font-bold">{b.brand}</p>}
                <span className="text-sm text-gray-700">{b.benefit}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
