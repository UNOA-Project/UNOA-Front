import React from 'react';
import styles from './MessageItem.module.css'; 

const MessageItem = ({ message, formatTime }) => {
  const messageClasses = [
    styles.message,
    styles[message.role], // 'user' 또는 'assistant' 클래스를 동적으로 적용
    message.isStreaming ? styles.streaming : '',
    message.isTemp ? styles.temp : '', // 임시 메시지일 경우
  ].join(' '); 

  return (
    <div className={messageClasses}>
      <div className={styles.messageContent}>
        {message.content}
      </div>
      <div className={styles.messageTime}>
        {formatTime(message.timestamp)}
        {message.isTemp && <span className={styles.tempIndicator}>전송중</span>}
      </div>
    </div>
  );
};

export default MessageItem;