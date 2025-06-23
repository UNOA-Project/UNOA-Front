import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import ArrowIcon from '@/assets/arrow-right.svg?react'
import useToast from '@/hooks/useToast'
import { useAuth } from '@/contexts/AuthContext'

const API_URL = `${import.meta.env.VITE_BACK_URL}/api`

export default function KakaoExtraInfoPage() {
  const [isUplus, setIsUplus] = useState('')
  const [isUplusError, setIsUplusError] = useState('')
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [token, setToken] = useState('')

  const { showDefaultToast, showErrorToast } = useToast()

  const { login } = useAuth()

  useEffect(() => {
    const url = new URL(window.location.href)
    const tokenParam = url.searchParams.get('token')

    if (!tokenParam) {
      showErrorToast('다시 로그인해주세요.')
      setTimeout(() => navigate('/login'), 1000)
      return
    }

    try {
      const decoded = jwtDecode(tokenParam)

      const currentTime = Date.now() / 1000 // 초 단위
      if (decoded.exp && decoded.exp < currentTime) {
        showErrorToast('로그인 시간이 만료되었습니다.')
        navigate('/login')
        return
      }

      setName(decoded.name || '')
      setToken(tokenParam)

      showDefaultToast('추가로 정보를 입력해주세요.')

      setTimeout(() => {
        url.searchParams.delete('token')
        window.history.replaceState({}, '', url)
      }, 0)
    } catch {
      showErrorToast('유효하지 않은 토큰입니다.')
      navigate('/login')
    }
  }, [])

  const handleSubmit = async () => {
    if (!isUplus) {
      setIsUplusError('ⓘ LG U+ 요금제 여부를 선택해주세요.')
      return
    }

    try {
      await axios.post(
        `${API_URL}/auth/kakao/complete`,
        {
          token,
          isUplus,
        },
        {
          withCredentials: true,
        }
      )

      await new Promise(resolve => setTimeout(resolve, 300))

      await login()

      showDefaultToast(`${name}님, 환영합니다! 🎉`)
      navigate('/')
    } catch (err) {
      if (err.response?.status === 400) {
        showErrorToast('로그인 시간이 만료되었습니다.')
        navigate('/login')
      } else if (err.response?.status === 409) {
        showErrorToast('이미 가입된 사용자입니다.')
        navigate('/login')
      } else {
        showErrorToast('가입 처리 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col items-center justify-center px-4">
      <h1 className="text-title sm:text-page-header mb-4 text-center font-bold md:mb-8 md:text-4xl">
        추가 정보 입력
      </h1>
      <p className="md:text-card-title mb-6 text-center">
        UNOA 사용을 위해 <br className="inline sm:hidden" />
        <strong className="text-primary-purple">LG U+ 가입 여부</strong>를 확인해주세요.
      </p>

      <div className="w-full max-w-[320px] space-y-1 sm:max-w-sm sm:space-y-2 md:max-w-md">
        <div className="mb-1">
          <label className="ml-2 block"> 가입하신 이름</label>
          <input
            type="text"
            value={name}
            disabled
            className="w-full rounded-sm border bg-gray-100 px-4 py-2 text-gray-700 placeholder:text-sm focus:ring-1 sm:rounded-lg sm:px-5 sm:py-4"
          />
        </div>

        <div className="mt-10 mb-5 flex flex-col">
          <div className="flex flex-row justify-center">
            <span className="text-card-title sm:text-sub-title mb-4 text-center font-medium sm:mb-6">
              LG U+ 요금제를 사용중이신가요? <span className="text-error">*</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-10">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isUplus"
                value="yes"
                checked={isUplus === 'yes'}
                onChange={() => {
                  setIsUplus('yes')
                  setIsUplusError('')
                }}
                className="accent-primary-purple"
              />
              <span>예</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isUplus"
                value="no"
                checked={isUplus === 'no'}
                onChange={() => {
                  setIsUplus('no')
                  setIsUplusError('')
                }}
                className="accent-primary-purple"
              />
              <span>아니요</span>
            </label>
          </div>
          <div
            className={`text-caption sm:text-small-body text-error mt-2 overflow-hidden text-center transition-all duration-300 ease-in-out ${
              isUplusError ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {isUplusError}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="group bg-primary-purple relative mt-4 w-full rounded-sm py-3 font-semibold text-white sm:rounded-lg sm:py-4"
        >
          가입 완료
          <ArrowIcon className="absolute top-1/2 right-4 h-4 w-5 -translate-y-1/2 duration-300 group-hover:translate-x-1" />
        </button>
      </div>
      <footer className="text-text-secondary text-caption sm:text-small-body mt-6 flex w-full max-w-[320px] flex-row justify-between px-2 max-[350px]:flex-col max-[350px]:text-center sm:mt-12 sm:max-w-sm md:max-w-md md:px-6">
        <p>김현우A | 송은재 | 심영민 | 홍성현 | 황주경</p>
        <p>© UNOA Corp.</p>
      </footer>
    </div>
  )
}
