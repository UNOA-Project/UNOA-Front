import { Link } from 'react-router-dom'
import ArrowIcon from '@/assets/arrow-right.svg?react'
import Kakao from '@/assets/kakao-icon.svg'

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center py-4 md:py-10">
      <h1 className="text-sub-title sm:text-page-header mb-2 font-bold md:mb-4 md:text-4xl">
        UNOA 계정 생성
      </h1>
      <p className="md:text-card-title mb-4 sm:mb-6">
        UNOA 계정을 가지고 계시나요?
        <Link
          to="/login"
          className="group text-primary-purple ml-2 inline-flex items-center hover:font-medium"
        >
          로그인
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:-rotate-45">
            →
          </span>
        </Link>
      </p>

      <form className="w-full max-w-[320px] sm:max-w-sm md:max-w-md">
        <div className="space-y-6">
          {/* 이름 */}
          <div>
            <label className="mb-1 ml-2 block">
              이름 <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              className="focus:ring-primary-purple hover:ring-primary-purple sm:placeholder:text-body w-full rounded-sm border px-4 py-2 placeholder:text-sm hover:ring-1 focus:ring-1 focus:outline-none sm:rounded-lg sm:px-5 sm:py-4"
            />
          </div>

          {/* 아이디 + 중복확인 */}
          <div>
            <div className="mb-1 flex flex-row items-center justify-between">
              <label className="ml-2 block">
                아이디 <span className="text-error">*</span>
              </label>
              <button type="button" className="text-small-body mr-2 hover:underline">
                중복 확인
              </button>
            </div>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              className="focus:ring-primary-purple sm:placeholder:text-body hover:ring-primary-purple w-full rounded-sm border px-4 py-2 placeholder:text-sm hover:ring-1 focus:ring-1 focus:outline-none sm:rounded-lg sm:px-5 sm:py-4"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="mb-1 ml-2 block">
              비밀번호 <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="영문자, 숫자, 특수문자 포함 8~20자"
                className="focus:ring-primary-purple sm:placeholder:text-body hover:ring-primary-purple w-full rounded-sm border px-4 py-2 pr-24 placeholder:text-sm hover:ring-1 focus:ring-1 focus:outline-none sm:rounded-lg sm:px-5 sm:py-4"
              />
              <button
                type="button"
                className="text-small-body absolute top-1/2 right-4 -translate-y-1/2 text-gray-800 hover:underline"
              >
                비밀번호 표시
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="mb-1 ml-2 block">
              비밀번호 확인 <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="비밀번호를 확인해주세요"
                className="focus:ring-primary-purple sm:placeholder:text-body hover:ring-primary-purple w-full rounded-sm border px-4 py-2 pr-24 placeholder:text-sm hover:ring-1 focus:ring-1 focus:outline-none sm:rounded-lg sm:px-5 sm:py-4"
              />
              <button
                type="button"
                className="text-small-body absolute top-1/2 right-4 -translate-y-1/2 text-gray-800 hover:underline"
              >
                비밀번호 표시
              </button>
            </div>
          </div>

          {/* 라디오 버튼 */}
          <div className="mb-2 ml-2 flex flex-col justify-between sm:flex-row">
            <div className="flex flex-row items-center space-x-2">
              <span>
                LG U+ 요금제를 사용중이신가요? <span className="text-error">*</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="isUplus" value="yes" className="accent-primary-purple" />
                <span>예</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="isUplus" value="no" className="accent-primary-purple" />
                <span>아니요</span>
              </label>
            </div>
          </div>
        </div>

        <div className="border-text-main mt-4 mb-4 border-t sm:mb-8" />

        {/* 가입하기 버튼 */}
        <button
          type="submit"
          className="group bg-primary-purple relative mb-2 w-full rounded-sm py-3 font-semibold text-white sm:mb-4 sm:rounded-lg sm:py-4"
        >
          가입하기
          <ArrowIcon className="absolute top-1/2 right-4 h-4 w-5 -translate-y-1/2 duration-300 group-hover:translate-x-1" />
        </button>

        {/* 카카오로 가입하기 버튼 */}
        <button
          type="button"
          className="group bg-kakao relative w-full items-center justify-center rounded-sm py-3 font-semibold sm:rounded-lg sm:py-4"
        >
          <img
            src={Kakao}
            alt="카카오 아이콘"
            className="text-banner absolute top-1/2 left-4 -translate-y-1/2"
          />
          <span className="block text-center">카카오로 가입하기</span>
          <ArrowIcon className="absolute top-1/2 right-4 h-4 w-5 -translate-y-1/2 duration-300 group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  )
}
