// src/pages/ChatbotPage.jsx

import { useState } from 'react'
// 훅과 CSS 파일은 현재 위치(pages)에서 한 단계 위로 올라가야 하므로 '../'를 사용합니다.
import { useSocket } from '../hooks/useSocket'
import { useChat } from '../hooks/useChat'
import { useUI } from '../hooks/useUI'
import styles from './ChatbotPage.module.css'

// 컴포넌트들은 한 단계 위로 올라가 'components/chatbot' 폴더 안에 있습니다.
import ChatHeader from '../components/chatbot/ChatHeader'
import ChatContainer from '../components/chatbot/ChatContainer'
import WelcomeMessage from '../components/chatbot/WelcomeMessage'
import LoadingScreen from '../components/chatbot/LoadingScreen'

// 함수 이름을 App에서 ChatbotPage로 변경합니다.
function ChatbotPage() {
  const [currentMode, setCurrentMode] = useState('normal')
  const { socket, isConnected } = useSocket()
  const { messages, isStreaming, sendMessage, addLocalMessage, resetMessages, sendPromptSilently } =
    useChat(socket, isConnected)

  const { messagesEndRef, inputRef, formatTime } = useUI(messages, '', isStreaming, isConnected)

  const handleModeChange = newMode => {
    if (currentMode === newMode) return
    resetMessages()
    setCurrentMode(newMode)
  }

  // 로딩 화면 로직 추가
  if (!isConnected) {
    return <LoadingScreen />
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.welcomeMessageContainer}>
        <WelcomeMessage />
      </div>

      <div className={styles.app}>
        <ChatHeader
          currentMode={currentMode}
          onModeChange={handleModeChange}
          isStreaming={isStreaming}
        />
        <ChatContainer
          currentMode={currentMode}
          messages={messages}
          onSendMessage={sendMessage}
          addLocalMessage={addLocalMessage}
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
