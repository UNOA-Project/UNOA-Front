import React from 'react'
import MessageItem from './MessageItem'
import ChatModeWelcome from './ChatModeWelcome'
import styles from './MessageList.module.css'

const MessageList = ({ messages, formatTime, messagesEndRef }) => {
  return (
    // 메시지 목록을 감싸는 메인 컨테이너
    <div className={styles.messagesContainer}>
      {/* 메시지가 하나도 없으면 환영 컴포넌트 */}
      {messages.length === 0 ? (
        <ChatModeWelcome />
      ) : (
        <>
          {messages.map(message => (
            <MessageItem
              key={message._id || message.id}
              message={message}
              formatTime={formatTime}
            />
          ))}
        </>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
