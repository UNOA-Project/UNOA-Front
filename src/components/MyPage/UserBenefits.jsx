import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getUserBenefits } from '@/apis/userApi'
import LoadingScreen from '@/components/chatbot/LoadingScreen'
import ArrowIcon from '@/assets/arrow-right.svg?react'

const categoryOrder = [
  '푸드',
  '문화/여가',
  '생활/편의',
  '엑티비티',
  '쇼핑',
  '여행/교통',
  '뷰티/건강',
  '교육',
  'APP/기기',
]

export const UserBenefits = () => {
  const [membershipBenefits, setMembershipBenefits] = useState([])
  const [longTermBenefits, setLongTermBenefits] = useState([])
  const [planBenefits, setPlanBenefits] = useState({})
  const [benefitPages, setBenefitPages] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(categoryOrder[0])

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
        const res = await getUserBenefits(user.user._id)
        setMembershipBenefits(res.membershipBenefits)
        setLongTermBenefits(res.longTermBenefits)
        setPlanBenefits(res.planBenefits)
      } catch {
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

  const sorted = categoryOrder.reduce((acc, key) => {
    if (groupedMembership[key]) acc[key] = groupedMembership[key]
    return acc
  }, {})

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
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.keys(sorted).map(category => (
            <button
              key={category}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === category ? 'bg-primary-purple text-white' : 'bg-gray-50 text-gray-600'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-4">
          {sorted[activeTab].map((b, idx) => (
            <div key={idx} className="border-gray-90 flex items-center gap-4 rounded-xl border p-4">
              <div className="flex flex-col gap-y-1.5">
                <img src={`/images/benefits/${b.brand.toLowerCase()}.png`} className="w-9" />
                <p className="text-base font-bold">{b.brand}</p>
                <p className="text-sm break-keep whitespace-normal text-gray-700">{b.benefit}</p>
              </div>
            </div>
          ))}
        </div>
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
                  {(categoryLabels[category] || category).replace(
                    /\(택1\)/,
                    benefits.length === 1 ? '' : '(택1)'
                  )}
                </h3>
                {imageCategories.includes(category) ? (
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => paginate(category, 'prev')}
                      disabled={(benefitPages[category] || 0) === 0}
                      className={`text-sm text-gray-500 disabled:opacity-30 ${
                        benefits.length <= 3 ? 'invisible' : ''
                      }`}
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
                              src={`/images/icons/${b.benefit.trim()}.png`}
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
                      className={`text-sm text-gray-500 disabled:opacity-30 ${
                        benefits.length <= 3 ? 'invisible' : ''
                      }`}
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
