import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatModeWelcome from './ChatModeWelcome'
import NormalModeWelcome from './ChatModeWelcome'

const ChatMode = props => {
  const { isWelcomeState } = props

  return (
    <div className="flex h-full flex-col">
      <MessageList
        messages={props.messages}
        formatTime={props.formatTime}
        messagesEndRef={props.messagesEndRef}
        WelcomeComponent={isWelcomeState ? NormalModeWelcome : ChatModeWelcome}
      />
      <MessageInput
        onSendMessage={props.onSendMessage}
        addLocalMessage={props.addLocalMessage}
        isStreaming={props.isStreaming}
        isConnected={props.isConnected}
        inputRef={props.inputRef}
        isWelcomeState={isWelcomeState}
      />
    </div>
  )
}

export default ChatMode
