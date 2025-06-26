import ChatMode from './ChatMode'
import SimpleMode from './SimpleMode'
const ChatContainer = props => {
  const { currentMode, messages } = props
  const isWelcomeState = messages?.length === 0

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-b-xl p-4 pt-0">
      {currentMode === 'normal' ? (
        <ChatMode {...props} isWelcomeState={isWelcomeState} />
      ) : (
        <SimpleMode {...props} />
      )}
    </div>
  )
}

export default ChatContainer
