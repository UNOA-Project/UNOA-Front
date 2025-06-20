import { useNavigate } from 'react-router-dom'
import ArrowIcon from '@/assets/arrow-right.svg?react'

export default function ToastConfirmRedirect({ message, redirectPath, closeToast }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <h3 className="text-text-main text-card-title sm:text-sub-title mb-4 font-bold">
        🎉 환영합니다!
      </h3>
      <p className="text-small-body sm:text-body text-text-main mb-4 sm:mb-6">{message}</p>
      <button
        className="group bg-primary-purple text-caption sm:text-small-body relative w-25 rounded-full py-2 font-medium text-white sm:w-40"
        onClick={() => {
          closeToast()
          navigate(redirectPath)
        }}
      >
        로그인
        <ArrowIcon className="absolute top-1/2 right-4 hidden h-3 w-5 -translate-y-1/2 duration-300 group-hover:translate-x-1 sm:inline" />
      </button>
    </div>
  )
}
