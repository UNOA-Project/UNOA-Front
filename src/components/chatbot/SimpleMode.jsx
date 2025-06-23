import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import ChatBotImg from '@/assets/WelcomeNoa.svg'
import HandImg from '@/assets/hand-sign.svg'
import NoaYeah from '@/assets/noa-yeah.svg'

import { SimpleModeForm } from './SimpleModeForm'
import PlanCard from '../ListPage/PlanCard/PlanCard'

export default function SimpleMode({
  sendPromptSilently,
  simpleModeResultMessage,
  setSimpleModeResultMessage,
}) {
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState(null)
  const navigate = useNavigate()
  const [isWaiting, setIsWaiting] = useState(false)

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

    setSimpleModeResultMessage(null)
    setIsWaiting(true)

    sendPromptSilently(prompt, 'simple')
  }

  useEffect(() => {
    if (simpleModeResultMessage) {
      setIsWaiting(false)
    }
  }, [simpleModeResultMessage])
  const lastMessage = simpleModeResultMessage

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
        <div className="relative flex h-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="absolute z-0 h-56 w-56 rounded-full bg-gradient-to-br from-[#f3dcff] to-[#ece0ff] opacity-80 blur-3xl sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] lg:h-[280px] lg:w-[280px]" />
          {isWaiting ? (
            <p className="z-10 text-center text-base text-gray-500">
              추천 결과를 기다리고 있어요...
            </p>
          ) : lastMessage ? (
            <div className="absolute top-2 z-10 mt-1 flex w-full flex-col items-center justify-center">
              <div className="text-text-main text-center">
                <h2 className="text-base font-semibold sm:mb-1 sm:text-xl">
                  NOA가 추천한 요금제예요 <br />
                </h2>
                <h3 className="text-sm font-medium text-gray-700 sm:text-base">
                  <strong className="text-primary-purple">라이프스타일</strong>에 꼭 맞는 요금제를
                  찾아왔어요
                </h3>
              </div>
              <div className="relative flex flex-col items-center">
                <div className="absolute -right-18 -bottom-11 z-0 hidden w-36 sm:-right-28 sm:-bottom-16 sm:block sm:w-44">
                  <img src={NoaYeah} alt="" />
                </div>
                <div className="relative z-10 max-w-sm scale-90 sm:w-full sm:scale-90">
                  <PlanCard plan={lastMessage.recommendedPlans[0]} isCompare={false} />
                </div>
              </div>
              <button
                onClick={() => {
                  setStarted(false)
                  setResult(null)
                  setSimpleModeResultMessage(null)
                  setIsWaiting(false)
                }}
                className="z-10 max-w-sm rounded-full bg-gray-400 px-6 py-[1.6vh] text-base font-medium text-white sm:w-[50%] sm:py-[1.5vh] sm:text-base"
              >
                다시 추천받고 싶어요!
              </button>
              <button
                onClick={() => navigate('/planlist')}
                className="bg-primary-purple z-10 mt-1 max-w-sm rounded-full px-6 py-[1.6vh] text-base font-medium text-white sm:w-[50%] sm:py-[1.5vh] sm:text-base"
              >
                다른 요금제도 볼래요!
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <SimpleModeForm onFinish={handleFinish} />
      )}
    </>
  )
}
