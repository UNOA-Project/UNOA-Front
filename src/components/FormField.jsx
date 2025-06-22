import { useState } from 'react'

export default function FormField({
  label,
  required = false,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  showToggle = false,
  rightText,
  onRightClick,
  inputClassName = '',
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordField = type === 'password' && showToggle
  const actualType = isPasswordField && showPassword ? 'text' : type

  return (
    <div>
      <div className="mb-1 flex flex-row items-center justify-between">
        <label className="ml-2 block">
          {label} {required && <span className="text-error">*</span>}
        </label>
        {rightText && (
          <button
            type="button"
            onClick={onRightClick}
            className="text-small-body mr-2 hover:underline"
          >
            {rightText}
          </button>
        )}
      </div>

      <div className="relative">
        <input
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`focus:ring-primary-purple hover:ring-primary-purple sm:placeholder:text-body w-full rounded-sm border px-4 py-2 ${
            isPasswordField ? 'pr-24' : ''
          } placeholder:text-sm hover:ring-1 focus:ring-1 focus:outline-none sm:rounded-lg sm:px-5 sm:py-4 ${inputClassName}`}
          {...rest}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="text-small-body absolute top-1/2 right-4 -translate-y-1/2 text-gray-800 hover:underline"
          >
            {showPassword ? '숨기기' : '비밀번호 표시'}
          </button>
        )}
      </div>

      <div
        className={`text-caption sm:text-small-body text-error mt-2 ml-2 overflow-hidden transition-all duration-300 ease-in-out ${
          error ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {error}
      </div>
    </div>
  )
}
