import { useState } from 'react'
import { useSocket } from '../hooks/useSocket'
import { useChat } from '../hooks/useChat'
import { useUI } from '../hooks/useUI'

import ChatHeader from '../components/chatbot/ChatHeader'
import ChatContainer from '../components/chatbot/ChatContainer'
import WelcomeMessage from '../components/chatbot/WelcomeMessage'
import LoadingScreen from '../components/chatbot/LoadingScreen'

// 배경 효과를 위한 SVG 컴포넌트
import SoapBubble from '@/assets/soap-bubble.svg?react'

function ChatbotPage() {
  const [currentMode, setCurrentMode] = useState('normal')
  const { socket, isConnected } = useSocket()

  const { messages, isStreaming, sendMessage, resetConversation, sendPromptSilently } = useChat(
    socket,
    isConnected
  )

  //useUI는 메시지 변경뿐만 아니라 모드 변경도 감지
  const { messagesEndRef, inputRef, formatTime } = useUI(messages, currentMode)

  const handleModeChange = newMode => {
    if (currentMode === newMode) return
    setCurrentMode(newMode)
  }

  if (!isConnected) {
    return <LoadingScreen />
  }

  return (
    // 전체 페이지 컨테이너
    <div className="flex h-[calc(100vh-var(--header-height))] items-center justify-center bg-gradient-to-br from-[#899df4] to-[#9262c3]">
      {/* 배경 비눗방울 효과 */}
      <div className="pointer-events-none fixed top-[var(--header-height)] left-0 z-0 h-[calc(100vh-var(--header-height))] w-[100vw] select-none">
        <SoapBubble className="absolute top-[15%] left-[25%] h-41 w-41" />
        <SoapBubble className="absolute top-[4%] right-[2%] h-80 w-80" />
        <SoapBubble className="absolute -bottom-[1%] -left-[1.5%] h-40 w-40" />
        <SoapBubble className="absolute bottom-[13%] left-[40%] h-20 w-20" />
      </div>

      {/* 데스크탑용 환영 메시지 (반응형) */}
      <div className="z-10 hidden lg:block">
        <WelcomeMessage />
      </div>

      {/* 메인 챗봇 앱 컨테이너 */}
      <div className="z-10 flex h-full w-full max-w-[550px] flex-col bg-gradient-to-b from-[#F9F9FF] to-[#F7F2FF] shadow-none lg:h-[80vh] lg:max-h-[80vh] lg:max-w-[600px] lg:rounded-xl lg:shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
        <ChatHeader
          currentMode={currentMode}
          onModeChange={handleModeChange}
          isStreaming={isStreaming}
          onReset={resetConversation}
        />

        <ChatContainer
          currentMode={currentMode}
          messages={messages}
          onSendMessage={sendMessage}
          isStreaming={isStreaming}
          isConnected={isConnected}
          formatTime={formatTime}
          messagesEndRef={messagesEndRef}
          inputRef={inputRef}
          sendPromptSilently={sendPromptSilently}
        />
      </div>
    </div>
  )
}

export default ChatbotPage
