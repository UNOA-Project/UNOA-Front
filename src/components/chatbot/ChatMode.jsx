import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatModeWelcome from './ChatModeWelcome'

const ChatMode = props => {
  return (
    <div className="flex h-full flex-col">
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
    </div>
  )
}

export default ChatMode
