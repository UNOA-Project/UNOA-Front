import ChatMode from './ChatMode'
import SimpleMode from './SimpleMode'
const ChatContainer = props => {
  const { currentMode } = props

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-b-xl bg-[#f7f2ff] p-4 pt-0">
      {currentMode === 'normal' ? <ChatMode {...props} /> : <SimpleMode {...props} />}
    </div>
  )
}

export default ChatContainer