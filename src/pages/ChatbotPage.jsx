// src/pages/ChatbotPage.jsx

import { useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useChat } from "../hooks/useChat";
import { useUI } from "../hooks/useUI";
import styles from "./ChatbotPage.module.css";

import ChatHeader from "../components/chatbot/ChatHeader";
import ChatContainer from "../components/chatbot/ChatContainer";
import WelcomeMessage from "../components/chatbot/WelcomeMessage";
import LoadingScreen from "../components/chatbot/LoadingScreen";

function ChatbotPage() {
  const [currentMode, setCurrentMode] = useState("normal");
  const { socket, isConnected } = useSocket();
  const {
    messages,
    isStreaming,
    sendMessage,
    addLocalMessage,
    resetMessages,
    sendPromptSilently,
  } = useChat(socket, isConnected);

  const { messagesEndRef, inputRef, formatTime } = useUI(
    messages,
    "",
    isStreaming,
    isConnected
  );

  const handleModeChange = (newMode) => {
    if (currentMode === newMode) return;
    resetMessages();
    setCurrentMode(newMode);
  };

  // 로딩 화면 로직 추가
  if (!isConnected) {
    return <LoadingScreen />;
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
  );
}

export default ChatbotPage;
