import { useNavigate } from 'react-router-dom'
import Noa from '@/assets/NoMember.png'
import { motion } from 'framer-motion'

export default function NoUser() {
  const navigate = useNavigate()
  const MotionButton = motion.button

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="border-border flex w-[85%] flex-col items-center justify-center gap-6 rounded-xl border bg-white px-6 py-4 sm:gap-8 sm:py-10 lg:w-[70%] 2xl:w-[50%]">
      <img src={Noa} alt="노아 캐릭터" className="w-35 sm:w-45" />
      <div className="max-[320px]:text-body text-sub-title sm:text-title text-center font-bold">
        로그인하고 멤버십
        <br />
        <span className="text-primary-purple">혜택</span>을 확인해 보세요
      </div>
      <MotionButton
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="bg-primary-purple sm:text-card-title mb-2 min-w-[200px] rounded-full py-3 font-medium text-white max-[320px]:py-2 sm:w-[50%] sm:py-4"
        onClick={handleLogin}
      >
        로그인
      </MotionButton>
    </div>
  )
}
