import React from 'react'
import WelcomeNoaIcon from '../../assets/welcomeNoa.svg?react'

const SimpleModeWelcome = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // 아이템을 세로로 정렬합니다.
        justifyContent: 'center', // 수직 방향으로 가운데 정렬합니다.
        alignItems: 'center', // 수평 방향으로 가운데 정렬합니다.
        height: '100%', // 부모 컴포넌트 높이를 꽉 채워 정중앙 정렬이 되도록 합니다.
      }}
    >
      <WelcomeNoaIcon />
      <p
        style={{
          marginTop: '50px', // 아이콘과의 상단 여백 (50px)
          fontSize: '18px', // 글자 크기
          color: '#555', // 글자 색상
          fontWeight: '500', // 글자 두께
        }}
      >
        NOA가 간단한 질문 10가지로 당신에게 맞는 요금제를 추천해드릴게요!
      </p>
    </div>
  )
}

export default SimpleModeWelcome
