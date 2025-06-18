// src/components/ChatMode.jsx

import React from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatModeWelcome from './ChatModeWelcome'

const ChatMode = props => {
  return (
    <>
      <MessageList
        messages={props.messages}
        formatTime={props.formatTime}
        messagesEndRef={props.messagesEndRef}
        WelcomeComponent={ChatModeWelcome}
      />
      <MessageInput
        onSendMessage={props.onSendMessage}
        addLocalMessage={props.addLocalMessage}
        isStreaming={props.isStreaming}
        isConnected={props.isConnected}
        inputRef={props.inputRef}
      />
    </>
  )
}

export default ChatMode
