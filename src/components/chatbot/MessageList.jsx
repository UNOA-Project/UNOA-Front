import MessageItem from "./MessageItem";
import ChatModeWelcome from "./ChatModeWelcome";
import styles from "./MessageList.module.css"; // CSS 모듈 import

const MessageList = ({ messages, formatTime, messagesEndRef }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.length === 0 ? (
        <ChatModeWelcome />
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              formatTime={formatTime}
            />
          ))}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
