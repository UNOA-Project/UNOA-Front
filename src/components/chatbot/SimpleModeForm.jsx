import { useState } from 'react'
import { motion } from 'framer-motion'
import ChatBotImg from '@/assets/WelcomeNoa.svg'
import ArrowIcon from '@/assets/arrow-right.svg?react'
import { questions } from '@/data/questions'

export const SimpleModeForm = ({ onFinish }) => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

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
    <div className="flex h-screen flex-col overflow-y-auto sm:px-4 sm:py-6">
      <p className="text-card-title mb-2 text-center sm:mb-4">
        {step + 1} / {questions.length}
      </p>
      <div className="mx-auto mb-5 w-[85%] max-w-lg sm:mb-12 sm:w-[80%]">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="bg-primary-purple h-full rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between sm:mb-5">
        <button
          onClick={handleBack}
          className={`group p-4 ${step === 0 ? 'pointer-events-none invisible' : ''}`}
        >
          <ArrowIcon className="h-8 w-8 rotate-180 text-black duration-300 group-hover:-translate-x-1" />
        </button>
        <img src={ChatBotImg} alt="NOA" className="w-28 sm:w-48" />
        <button
          onClick={handleNext}
          disabled={!selectedChoice}
          className={`group p-4 transition-opacity duration-200 ${
            selectedChoice ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <ArrowIcon
            className={`h-8 w-8 duration-300 group-hover:translate-x-1 ${step === questions.length - 1 ? 'pointer-events-none opacity-0' : ''}`}
          />
        </button>
      </div>

      <p className="text-sub-title sm:text-title mx-auto mb-4 w-[85%] max-w-md text-center font-bold break-keep whitespace-pre-line sm:p-5 sm:px-2">
        {questions[step].question}
      </p>

      <div className="flex flex-grow flex-col items-center">
        <div className="flex w-full max-w-96 flex-col gap-3">
          {questions[step].choices.map((choice, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(choice)}
              className={`rounded-lg border border-gray-200 py-3 text-xl font-medium transition-colors duration-200 sm:p-5 ${
                choice === selectedChoice
                  ? 'bg-sub-lilac font-bold text-white'
                  : 'hover:bg-sub-lilac bg-white hover:text-white'
              }`}
            >
              {choice}
            </motion.button>
          ))}
        </div>
      </div>

      {step === questions.length - 1 && selectedChoice && (
        <div className="mt-6 flex justify-center">
          <button
            className="bg-primary-purple w-full rounded-2xl py-3 text-sm text-white sm:max-w-96 sm:py-4 sm:text-base"
            onClick={() => onFinish(answers)}
          >
            NOA의 추천 보기 →
          </button>
        </div>
      )}
    </div>
  )
}
