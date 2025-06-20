import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from '@/assets/arrow-right.svg?react'
import KakaoIcon from '@/assets/kakao-icon.svg'
import FormField from '@/components/FormField'

export default function LoginPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const [userIdError, setUserIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (!userId) {
      setUserIdError('아이디를 입력해주세요.')
    } else {
      setUserIdError('')
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.')
    } else {
      setPasswordError('')
    }

    if (userId && password) {
      // TODO: 로그인 API 연결
      console.log('로그인 요청', { userId, password })
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <h1 className="text-sub-title sm:text-page-header mb-2 font-bold md:mb-4 md:text-4xl">
        UNOA 계정
      </h1>
      <p className="md:text-card-title mb-4 sm:mb-6">
        아직 UNOA 계정이 없으신가요?
        <Link
          to="/register"
          className="group text-primary-purple ml-2 inline-flex items-center hover:font-medium"
        >
          회원가입
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:-rotate-45">
            →
          </span>
        </Link>
      </p>

      <form
        className="w-full max-w-[320px] space-y-1 sm:max-w-sm sm:space-y-2 md:max-w-md"
        onSubmit={handleSubmit}
      >
        <FormField
          label="아이디"
          value={userId}
          onChange={e => {
            setUserId(e.target.value)
            if (e.target.value) setUserIdError('')
          }}
          placeholder="아이디를 입력해주세요"
          error={userIdError}
        />

        <FormField
          label="비밀번호"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            if (e.target.value) setPasswordError('')
          }}
          placeholder="비밀번호를 입력해주세요"
          error={passwordError}
          showToggle
        />

        <div className="border-text-main mt-2 mb-4 border-t sm:mb-6" />

        <button
          type="submit"
          className="group bg-primary-purple relative mb-2 w-full rounded-sm py-3 font-semibold text-white sm:mb-4 sm:rounded-lg sm:py-4"
        >
          로그인
          <ArrowIcon className="absolute top-1/2 right-4 h-4 w-5 -translate-y-1/2 duration-300 group-hover:translate-x-1" />
        </button>

        <button
          type="button"
          className="group bg-kakao relative w-full items-center justify-center rounded-sm py-3 font-semibold sm:rounded-lg sm:py-4"
        >
          <img
            src={KakaoIcon}
            alt="카카오 아이콘"
            className="text-banner absolute top-1/2 left-4 -translate-y-1/2"
          />
          <span className="block text-center">카카오 로그인</span>
          <ArrowIcon className="absolute top-1/2 right-4 h-4 w-5 -translate-y-1/2 duration-300 group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  )
}
