import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import ChangePasswordModal from '@/components/MyPage/ChangePasswordModal'
import { useState } from 'react'
import useToast from '@/hooks/useToast'
import { logoutUser, changePassword } from '@/apis/userApi'

export default function UserNoPlan() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showSuccessToast, showErrorToast } = useToast()

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
    <div className="border-border flex w-[85%] flex-col rounded-xl border bg-white px-6 py-4 sm:gap-8 sm:py-10 lg:w-[70%] 2xl:w-[50%]">
      <div className="mx-0 flex flex-row items-center justify-between sm:mx-6 md:mx-8 lg:mx-10">
        <h2 className="text-card-title sm:text-sub-title md:text-title xl:text-section-title 2xl:text-page-header font-medium">
          <span className="text-primary-purple font-bold">{user.user.name || '회원'}</span>님
          <br className="hidden max-[350px]:block" /> 반갑습니다.
        </h2>
        {user.user.userId && (
          <button
            className="border-border text-small-body sm:text-body hover:text-primary-purple rounded-sm border px-2 py-2 transition-colors duration-300 sm:px-6"
            onClick={() => setIsModalOpen(true)}
          >
            비밀번호 변경
          </button>
        )}
      </div>

      <div className="mx-0 my-4 flex justify-center sm:mx-2 sm:my-0">
        <span className="text-main sm:text-body text-small-body text-center">
          ⓘ 현재는 테스트용 더미 데이터가 사용되고 있어, <br className="hidden max-[960px]:block" />
          <strong className="text-error">실제 LG U+ 가입 여부와 무관</strong>하게{' '}
          <br className="hidden max-[500px]:block" /> 요금제 예시가 표시됩니다.
        </span>
      </div>

      <div className="rounded-sm border border-gray-400 p-4 sm:p-6">
        <div className="mx-2 mb-4 flex justify-center sm:mx-4">
          <span className="text-main sm:text-body text-small-body text-center">
            아래는 <strong className="text-primary-purple">LG U+ 요금제 가입 회원</strong>에게{' '}
            <br className="hidden max-[555px]:block" />
            표시되는 예시입니다.
          </span>
        </div>

        <div className="flex flex-col items-stretch justify-between gap-4 sm:mx-2 sm:flex-row">
          <div className="border-border flex w-full flex-col gap-4 rounded-lg border px-6 py-4 text-center max-[340px]:px-4 sm:w-[60%]">
            <span className="max-[340px]:text-body text-card-title font-semibold">
              가입하신 요금제
            </span>
            <div className="flex flex-row items-center justify-between gap-2">
              <p className="max-[362px]:text-small-body flex w-[80px] items-start font-semibold">
                요금제 :
              </p>
              <p className="max-[340px]:text-small-body sm:text-body md:text-sub-title text-end font-bold break-keep whitespace-normal">
                5G 데이터 플러스
              </p>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <p className="max-[362px]:text-small-body flex w-[80px] items-start font-semibold">
                월 요금 :
              </p>
              <p className="max-[340px]:text-small-body sm:text-body md:text-sub-title text-end font-bold">
                월 66,000원
              </p>
            </div>
          </div>
          <div className="border-border flex w-full flex-row items-center justify-between rounded-lg border px-12 py-4 sm:w-[40%] sm:justify-center sm:gap-8 sm:px-6 md:gap-16">
            <div className="flex flex-col items-center gap-1">
              <img src="/rateIcon/우수.svg" alt="우수" className="h-8 w-8 sm:h-10 sm:w-10" />
              <p className="text-small-body">멤버십</p>
              <strong>우수</strong>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src="/rateIcon/5년이상.svg" alt="5년 이상" className="h-8 w-8 sm:h-10 sm:w-10" />
              <p className="text-small-body">장기고객</p>
              <strong>5년 이상</strong>
            </div>
          </div>
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
