// src/components/SimpleMode.jsx

import React, { useState } from 'react'
import MessageList from './MessageList'
import SimpleModeWelcome from './SimpleModeWelcome'

const simpleModeQuestions = [
  {
    question: '가장 먼저, 어떤 종류의 요금제를 찾고 계신가요?',
    answers: ['스마트폰 요금제', '온라인 전용 요금제', '태블릿/워치 요금제'],
  },
  {
    question: '한 달 데이터 사용량이 어느 정도 되시나요?',
    answers: [
      '카톡/웹서핑 위주 (15GB 미만)',
      '유튜브/SNS 자주 이용 (50~100GB)',
      '항상 넉넉하게! (110GB 이상/무제한)',
    ],
  },
  {
    question: '월 통신요금으로 어느 정도를 생각하고 계세요?',
    answers: ['알뜰하게 (5만원 미만)', '적당하게 (5~8만원)', '넉넉하게 (8만원 이상)'],
  },
  {
    question: '마지막으로, 요금제에서 가장 중요한 것은 무엇인가요?',
    answers: ['저렴한 가격 (가성비)', '많은 데이터', '다양한 부가혜택'],
  },
]

const SimpleMode = props => {
  const {
    messages,
    onSendMessage,
    addLocalMessage,
    formatTime,
    messagesEndRef,
    sendPromptSilently,
  } = props
  const [currentStep, setCurrentStep] = useState(-1)
  const [userAnswers, setUserAnswers] = useState([])

  // handleStart, handleAnswerClick 함수 로직은 이전과 동일합니다.
  const handleStart = () => {
    addLocalMessage(simpleModeQuestions[0].question, 'assistant')
    setCurrentStep(0)
  }

  const handleAnswerClick = answer => {
    onSendMessage(answer, 'simple')
    const updatedAnswers = [...userAnswers, answer]
    setUserAnswers(updatedAnswers)
    const nextStep = currentStep + 1
    if (nextStep < simpleModeQuestions.length) {
      setTimeout(() => {
        addLocalMessage(simpleModeQuestions[nextStep].question, 'assistant')
        setCurrentStep(nextStep)
      }, 500)
    } else {
      setTimeout(() => {
        addLocalMessage(
          '답변해주셔서 감사합니다. 잠시만 기다리시면 고객님의 답변을 바탕으로 최적의 요금제를 추천해 드릴게요!',
          'assistant'
        )
        const finalPrompt = `간단 모드를 통해 다음과 같은 답변을 얻었습니다:\n- 요금제 종류: ${updatedAnswers[0]}\n- 데이터 사용량: ${updatedAnswers[1]}\n- 월 예산: ${updatedAnswers[2]}\n- 중요 가치: ${updatedAnswers[3]}\n\n이 내용을 바탕으로 가장 적합한 요금제를 1~2개 추천하고, 그 이유를 자세히 설명해주세요.`
        setTimeout(() => {
          sendPromptSilently(finalPrompt, 'normal')
        }, 1500)
        setCurrentStep(nextStep)
      }, 500)
    }
  }

  const renderAnswerButtons = () => {
    if (currentStep < 0 || currentStep >= simpleModeQuestions.length) {
      return null
    }

    return (
      <div style={buttonsContainerStyle}>
        {simpleModeQuestions[currentStep].answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerClick(answer)} style={answerButtonStyle}>
            {answer}
          </button>
        ))}
      </div>
    )
  }

  if (currentStep === -1) {
    return (
      <div style={welcomeContainerStyle}>
        <SimpleModeWelcome />
        <button onClick={handleStart} style={startButtonStyle}>
          간단 추천 시작하기
        </button>
      </div>
    )
  }

  return (
    <>
      <MessageList messages={messages} formatTime={formatTime} messagesEndRef={messagesEndRef} />
      {renderAnswerButtons()}
    </>
  )
}

// ▼▼▼ 스타일 정의 객체 ▼▼▼
const welcomeContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}

const startButtonStyle = {
  marginTop: '20px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#667eea',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
}

const buttonsContainerStyle = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '15px',
}

const answerButtonStyle = {
  padding: '12px 20px',
  fontSize: '15px',
  fontWeight: '500',
  color: 'white',
  backgroundColor: '#667eea',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
}

export default SimpleMode
