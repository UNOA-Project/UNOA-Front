import WelcomeNoaIcon from '@/assets/welcomeNoa.svg?react'

const NormalModeWelcome = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4 pb-24">
      <div className="flex justify-center sm:mb-11">
        <WelcomeNoaIcon className="w-28 sm:w-36 md:w-40" />
      </div>

      <p className="text-center text-lg font-semibold break-keep text-gray-800 sm:text-xl">
        <span className="text-primary-pink font-bold">LG U+</span> 요금제가 궁금하다면, <br />
        <span className="text-primary-purple font-bold">NOA</span>
        에게 편하게 물어보세요!
      </p>
    </div>
  )
}

export default NormalModeWelcome
