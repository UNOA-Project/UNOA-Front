import React from 'react'
import WelcomeNoaIcon from '../../assets/welcomeNoa.svg?react'

const NormalModeWelcome = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {/* 아이콘 */}
      <WelcomeNoaIcon />

      {/* 아이콘 아래에 표시될 텍스트 */}
      <p
        style={{
          marginTop: '10px', // 아이콘과의 상단 여백 (50px)
          fontSize: '18px', // 글자 크기
          color: '#555', // 글자 색상
          fontWeight: '500', // 글자 두께
        }}
      >
        만나서 반가워요
      </p>
    </div>
  )
}

export default NormalModeWelcome
