import ChatBotImg from '@/assets/WelcomeNoa.svg'
import HandImg from '@/assets/hand-sign.svg'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { SimpleModeForm } from './SimpleModeForm'

export default function SimpleMode() {
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState(null)

  const handleFinish = answers => {
    console.log('사용자 응답:', answers)
    setResult(answers)
  }

  return (
    <>
      {!started ? (
        <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center rounded-xl px-4 py-10 sm:px-6">
          <div className="mb-7 flex justify-center sm:mb-11">
            <img src={ChatBotImg} alt="NOA 캐릭터" className="w-28 sm:w-36 md:w-40" />
          </div>

          <div className="mb-7 flex flex-col items-center sm:mb-11">
            <p className="text-center leading-relaxed font-semibold break-keep whitespace-normal sm:text-xl">
              간단한 질문에 답을 선택해주시면, <br />
              NOA가
              <strong className="ml-2 text-[20px] font-bold text-[#543ED9] sm:text-2xl">
                딱 맞는 요금제
              </strong>
              를 추천해드릴게요!
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <p className="mb-2 text-center text-sm text-gray-500 sm:mb-3 sm:text-sm">
              아래 버튼을 눌러 시작해보세요
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="bg-sub-lilac w-61 rounded-full px-6 py-3 text-lg font-semibold text-white shadow-md transition sm:px-8 sm:py-4 sm:text-xl"
              onClick={() => setStarted(true)}
            >
              시작하기
            </motion.button>
            <span className="absolute right-4 -bottom-[60px] sm:right-10 lg:right-6">
              <img src={HandImg} alt="버튼을 가리키는 손가락" className="pointer-events-none" />
            </span>
          </div>
        </div>
      ) : (
        <SimpleModeForm onFinish={handleFinish} />
      )}
    </>
  )
}
