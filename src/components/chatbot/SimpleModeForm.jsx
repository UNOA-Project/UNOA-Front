import { useState } from 'react'
import { motion } from 'framer-motion'
import ChatBotImg from '@/assets/WelcomeNoa.svg'
import ArrowIcon from '@/assets/arrow-right.svg?react'
import { questions } from '@/data/questions'

export const SimpleModeForm = ({ onFinish }) => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const MotionButton = motion.button

  const handleSelect = choice => {
    const newAnswers = [...answers]
    newAnswers[step] = { [questions[step].key]: choice }
    setAnswers(newAnswers)

    if (step + 1 < questions.length) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleNext = () => {
    if (step + 1 < questions.length) {
      setStep(step + 1)
    } else {
      onFinish(answers)
    }
  }

  const selectedChoice = answers[step] && Object.values(answers[step])[0]

  return (
    <div className="flex h-screen flex-col justify-center gap-y-[3.9vh] overflow-auto sm:gap-y-[2.4vh] md:gap-y-[2.7vh]">
      <div className="shrink-0">
        <p className="text-center text-sm lg:text-base">
          {step + 1} / {questions.length}
        </p>
        <div className="mx-auto mt-2 w-[85%] max-w-md sm:w-[68%]">
          <div className="h-1.5 rounded-full bg-gray-200">
            <div
              className="bg-primary-purple h-full rounded-full"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[1vh] lg:px-4">
        <div className="mb-[1%] flex w-full justify-around sm:mb-[0%]">
          <button
            onClick={handleBack}
            className={`group p-3 sm:p-4 ${step === 0 ? 'pointer-events-none invisible' : ''}`}
          >
            <ArrowIcon className="h-6 w-6 rotate-180 text-black duration-300 group-hover:-translate-x-1 sm:h-6 sm:w-6" />
          </button>
          <div className="w-[34%] sm:w-[23%]">
            <img src={ChatBotImg} alt="NOA" className="w-[100%]" />
          </div>
          <button
            onClick={handleNext}
            disabled={!selectedChoice}
            className={`group p-3 transition-opacity duration-200 sm:p-4 ${
              selectedChoice ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <ArrowIcon
              className={`h-6 w-6 duration-300 group-hover:translate-x-1 sm:h-6 sm:w-6 ${
                step === questions.length - 1 ? 'pointer-events-none opacity-0' : ''
              }`}
            />
          </button>
        </div>
        <p className="mx-auto max-w-sm text-center text-lg leading-snug font-bold break-keep whitespace-pre-line sm:text-lg md:text-lg lg:text-xl">
          {questions[step].question}
        </p>
      </div>

      <div className="flex flex-grow flex-col items-center">
        <div className="flex w-full max-w-[320px] flex-col items-center gap-[1vh]">
          {questions[step].choices.map((choice, i) => (
            <MotionButton
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(choice)}
              className={`w-[89%] rounded-lg border px-4 py-[1.6vh] text-base font-medium transition-colors duration-200 sm:py-[1.5vh] ${
                choice === selectedChoice
                  ? 'bg-sub-lilac border-sub-lilac font-bold text-white shadow-md'
                  : 'hover:bg-sub-lilac border-gray-200 bg-white text-gray-800 hover:text-white'
              }`}
            >
              {choice}
            </MotionButton>
          ))}
        </div>
      </div>

      {step === questions.length - 1 && selectedChoice && (
        <div className="mt-12 flex justify-center sm:mt-16">
          <button
            className="bg-primary-purple w-full max-w-md rounded-2xl px-6 py-[1.6vh] text-base font-medium text-white sm:w-[68%] sm:py-[1.5vh] sm:text-base"
            onClick={() => onFinish(answers)}
          >
            NOA의 추천 보기 →
          </button>
        </div>
      )}
    </div>
  )
}
