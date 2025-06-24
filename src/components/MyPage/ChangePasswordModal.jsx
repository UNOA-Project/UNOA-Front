import { useState } from 'react'

export default function ChangePasswordModal({ onClose, onSubmit }) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const validatePassword = value =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]).{8,20}$/.test(value)
      ? ''
      : 'ⓘ 영문자, 숫자, 특수문자 포함 8~20자로 입력해주세요.'

  const handleSubmit = () => {
    const passwordError = validatePassword(newPassword)

    if (passwordError) {
      setError(passwordError)
      return
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.')
      return
    }

    onSubmit({ newPassword })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-gray-20 w-full max-w-md rounded-xl p-6 sm:p-8">
        <h2 className="mb-6 text-center text-lg font-semibold sm:text-xl">비밀번호 변경</h2>
        <p className="mb-6 text-center text-sm text-gray-700 sm:text-base">
          비밀번호 변경 시 <strong className="text-error">로그아웃</strong>되며,
          <br className="hidden max-[400px]:block" /> 다시{' '}
          <strong className="text-primary-purple">로그인</strong>해야 합니다.
        </p>

        {/* 새 비밀번호 */}
        <div className="relative mb-3">
          <input
            type={showNew ? 'text' : 'password'}
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={e => {
              setNewPassword(e.target.value)
              setError('')
            }}
            className="focus:ring-primary-purple hover:ring-primary-purple w-full rounded-sm border px-3 py-2 pr-24 text-sm hover:ring-1 focus:ring-1 focus:outline-none sm:rounded-md sm:px-4 sm:py-3 sm:text-base"
          />
          <button
            type="button"
            onClick={() => setShowNew(prev => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-gray-700 hover:underline sm:text-sm"
          >
            {showNew ? '숨기기' : '비밀번호 표시'}
          </button>
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="relative mb-3">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value)
              setError('')
            }}
            className="focus:ring-primary-purple hover:ring-primary-purple w-full rounded-sm border px-3 py-2 pr-24 text-sm hover:ring-1 focus:ring-1 focus:outline-none sm:rounded-md sm:px-4 sm:py-3 sm:text-base"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(prev => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-gray-700 hover:underline sm:text-sm"
          >
            {showConfirm ? '숨기기' : '비밀번호 표시'}
          </button>
        </div>

        {/* 에러 메시지 */}
        <div
          className={`text-caption sm:text-small-body text-error ${error ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'} mt-2 ml-2 overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {error}
        </div>

        {/* 버튼 */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-300 px-4 py-2 text-sm sm:px-5 sm:text-base"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary-purple rounded-md px-4 py-2 text-sm text-white sm:px-5 sm:text-base"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  )
}
