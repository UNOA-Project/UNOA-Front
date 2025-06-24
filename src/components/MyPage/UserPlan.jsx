import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser, changePassword } from '@/apis/userApi'
import ChangePasswordModal from '@/components/MyPage/ChangePasswordModal'
import useToast from '@/hooks/useToast'

export default function UserPlan() {
  const { user } = useAuth()

  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { showSuccessToast, showErrorToast } = useToast()
  const formatPrice = price => {
    return parseInt(price, 10).toLocaleString()
  }

  const getMembershipBadge = membership => {
    const badgeMap = {
      VVIP: { label: 'VVIP', icon: '/rateIcon/VVIP.svg' },
      VIP: { label: 'VIP', icon: '/rateIcon/VIP.svg' },
      우수: { label: '우수', icon: '/rateIcon/우수.svg' },
    }

    return badgeMap[membership]
  }

  const getCustomerPeriodBadge = years => {
    switch (years) {
      case '10년 이상':
        return { label: '10년 이상', icon: '/rateIcon/10년이상.svg' }
      case '5년 이상':
        return { label: '5년 이상', icon: '/rateIcon/5년이상.svg' }
      case '2년 이상':
        return { label: '2년 이상', icon: '/rateIcon/2년이상.svg' }
      default:
        return null
    }
  }

  const membership = getMembershipBadge(user.user.planInfo.membership)
  const years = getCustomerPeriodBadge(user.user.planInfo.years)

  const handlePasswordChange = async ({ newPassword }) => {
    try {
      await changePassword({ newPassword })
      await logoutUser()
      showSuccessToast(
        <>
          비밀번호가 변경되었습니다. <br />
          다시 로그인해주세요.
        </>
      )
      setIsModalOpen(false)
      navigate('/login')
    } catch (err) {
      showErrorToast(err.response?.data?.message || '비밀번호 변경에 실패했습니다.')
    }
  }

  return (
    <div className="border-border flex w-[85%] flex-col gap-4 rounded-xl border bg-white px-2 py-4 sm:gap-8 sm:py-10 lg:w-[70%] 2xl:w-[50%]">
      <div className="mx-4 flex flex-row items-center justify-between md:mx-8 lg:mx-10">
        <h2 className="max-[450px]:text-card-title text-title xl:text-section-title 2xl:text-page-header font-medium">
          <span className="text-primary-purple font-bold">{user.user.name || '회원'}</span>
          님
          <br className="hidden max-[540px]:block" /> 반갑습니다.
        </h2>
        <div className="flex flex-row gap-2 max-[540px]:flex-col">
          {user.user.userId && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="border-border text-small-body sm:text-body hover:text-primary-purple rounded-sm border px-2 py-2 transition-colors duration-300 sm:px-6"
            >
              비밀번호 변경
            </button>
          )}
          <button className="border-border text-small-body sm:text-body rounded-sm border px-2 py-2 sm:px-6">
            등급기준 안내
          </button>
        </div>
      </div>
      <div className="mx-2 flex flex-col items-stretch justify-between gap-4 sm:flex-row md:mx-8 lg:mx-10">
        <div className="border-border flex w-full flex-col gap-4 rounded-lg border px-6 py-4 text-center max-[340px]:px-4 sm:w-[60%]">
          <span className="max-[340px]:text-body text-card-title font-semibold">
            가입하신 요금제
          </span>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="max-[362px]:text-small-body flex w-[80px] items-start font-semibold">
              요금제 :
            </p>
            <p className="max-[340px]:text-small-body sm:text-body md:text-sub-title text-end font-bold break-keep whitespace-normal">
              {user.user.planInfo.title}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="max-[362px]:text-small-body flex w-[80px] items-start font-semibold">
              월 요금 :
            </p>
            <p className="max-[340px]:text-small-body sm:text-body md:text-sub-title text-end font-bold">
              월 {formatPrice(user.user.planInfo.price)}원
            </p>
          </div>
        </div>
        <div
          className={`border-border flex w-full flex-row items-center rounded-lg border px-12 py-4 sm:w-[40%] sm:gap-8 sm:px-6 md:gap-16 ${
            years === null ? 'justify-center' : 'justify-between sm:justify-center'
          }`}
        >
          {membership && (
            <div className="flex flex-col items-center gap-1">
              <img
                src={membership.icon}
                alt={membership.label}
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              <p className="text-small-body">멤버십</p>
              <strong>{membership.label}</strong>
            </div>
          )}
          {years && (
            <div className="flex flex-col items-center gap-1">
              <img src={years.icon} alt={years.label} className="h-8 w-8 sm:h-10 sm:w-10" />
              <p className="text-small-body">장기고객</p>
              <strong>{years.label}</strong>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <ChangePasswordModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePasswordChange}
        />
      )}
    </div>
  )
}
