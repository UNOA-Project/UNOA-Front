import React from 'react'
import styles from './MessageItem.module.css'
import NoaIcon from '../../assets/noamessageicon.svg';
import ReactMarkdown from 'react-markdown'; 

const MessageItem = ({ message, formatTime }) => {
  const messageClasses = [
    styles.message,
    styles[message.role], // 'user' 또는 'assistant' 클래스를 동적으로 적용
    message.isStreaming ? styles.streaming : '',
    message.isTemp ? styles.temp : '', // 임시 메시지일 경우
  ].join(' ')

  return (
    <div className={styles.messageWrapper} data-role={message.role}>
      {message.role === 'assistant' && (
        <div className={styles.avatarContainer}>
          <img src={NoaIcon} alt="노아 아이콘" className={styles.avatarIcon} />
          <span className={styles.noaText}>NOA</span>
        </div>
      )}

      <div className={messageClasses}>
        <div className={styles.messageContent}><ReactMarkdown>{message.content}</ReactMarkdown></div>
        <div className={styles.messageTime}>
          {formatTime(message.timestamp)}
          {message.isTemp && <span className={styles.tempIndicator}>전송중</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageItem
