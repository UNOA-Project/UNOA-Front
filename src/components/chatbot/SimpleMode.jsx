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
        <div className="relative flex h-full flex-col items-center justify-center gap-y-16">
          <div>
            <img src={ChatBotImg} alt="NOA 캐릭터 이미지" className="w-[200px]" />
          </div>
          <p className="mb-2 text-center text-[24px] font-semibold">
            간단한 질문에 답을 선택해주시면, <br />
            NOA가
            <strong className="ml-2 text-[28px] font-bold text-[#543ED9]">딱 맞는 요금제</strong>를
            추천해드릴게요!
          </p>
          <div className="relative flex flex-col items-center gap-4">
            <p>아래 버튼을 눌러 시작해보세요</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="bg-light-purple relative flex h-[60px] w-[254px] items-center justify-center rounded-[30px] px-[92px] py-[18px] text-[20px] font-medium text-white shadow-md"
              onClick={() => setStarted(true)}
            >
              시작하기
            </motion.button>
            <img
              src={HandImg}
              alt="버튼을 가리키는 손가락"
              className="pointer-events-none absolute -right-[30px] -bottom-[60px] z-0"
            />
          </div>
        </div>
      ) : (
        <SimpleModeForm onFinish={handleFinish} />
      )}
    </>
  )
}
