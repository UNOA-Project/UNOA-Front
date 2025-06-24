import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import ChangePasswordModal from '@/components/MyPage/ChangePasswordModal'
import { useState } from 'react'
import useToast from '@/hooks/useToast'
import { logoutUser, changePassword } from '@/apis/userApi'

export default function UserNoPlan() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const MotionButton = motion.button
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showSuccessToast, showErrorToast } = useToast()

  const handleChatbot = () => {
    navigate('/chatbot')
  }

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

      <p className="text-card-title max-[320px]:text-body md:text-sub-title my-12 flex items-center justify-center font-semibold">
        현재 가입된 요금제가 없습니다.
      </p>

      <div className="flex items-center justify-center">
        <MotionButton
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="bg-primary-purple sm:text-card-title mb-2 min-w-[200px] rounded-full py-3 font-medium text-white max-[320px]:py-2 sm:w-[50%] sm:py-4"
          onClick={handleChatbot}
        >
          챗봇에게 요금제 추천 받기
        </MotionButton>
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
