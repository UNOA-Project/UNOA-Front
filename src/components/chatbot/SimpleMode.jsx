import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import ChatBotImg from '@/assets/WelcomeNoa.svg'
import HandImg from '@/assets/hand-sign.svg'
import NoaYeah from '@/assets/noa-yeah.svg'

import { SimpleModeForm } from './SimpleModeForm'
import PlanCard from '../ListPage/PlanCard/PlanCard'

export default function SimpleMode({ sendPromptSilently, messages }) {
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const handleFinish = answers => {
    console.log('사용자 응답:', answers)
    setResult(answers)

    const formatted = answers
      .map(obj => {
        const [key, value] = Object.entries(obj)[0]
        return `- ${key}: ${value}`
      })
      .join('\n')

    const prompt = `${formatted}`.trim()

    sendPromptSilently(prompt, 'simple')
  }

  const lastMessage = messages
    .slice()
    .reverse()
    .find(msg => msg.role === 'assistant')

  console.log(lastMessage)

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
      ) : result ? (
        <div className="relative flex h-full flex-col items-center justify-center px-4 py-10 sm:px-8">
          <div className="absolute z-0 h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#f3dcff] to-[#ece0ff] opacity-80 blur-3xl" />
          {lastMessage ? (
            <div className="z-10 flex w-full flex-col items-center gap-y-3">
              <div className="text-text-main text-center">
                <h2 className="mb-1 text-2xl font-bold">
                  NOA가 추천한 요금제예요 <br />
                </h2>
                <h3 className="text-xl font-medium text-gray-700">
                  <strong className="text-primary-purple">라이프스타일</strong>에 꼭 맞는 요금제를
                  찾아왔어요
                </h3>
              </div>
              <div className="relative flex">
                <img src={NoaYeah} alt="" className="absolute -right-35 -bottom-16 z-0 w-45" />
                <div className="relative z-10">
                  <PlanCard plan={lastMessage.recommendedPlans[0]} isCompare={false} />
                </div>
              </div>
              <button
                onClick={() => {
                  setStarted(false)
                  setResult(null)
                }}
                className="mt-7 max-w-sm rounded-full bg-gray-400 px-6 py-[1.6vh] text-base font-medium text-white sm:w-[50%] sm:py-[1.5vh] sm:text-base"
              >
                다시 추천받고 싶어요!
              </button>
              <button
                onClick={() => navigate('/planlist')}
                className="bg-primary-purple max-w-sm rounded-full px-6 py-[1.6vh] text-base font-medium text-white sm:w-[50%] sm:py-[1.5vh] sm:text-base"
              >
                다른 요금제도 볼래요!
              </button>
            </div>
          ) : (
            <p className="z-10 text-gray-500">추천 결과를 기다리고 있어요...</p>
          )}
        </div>
      ) : (
        <SimpleModeForm onFinish={handleFinish} />
      )}
    </>
  )
}
