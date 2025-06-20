const ChatHeader = ({ currentMode, onModeChange, isStreaming }) => {
  const baseButtonClasses =
    'py-2 px-4 rounded-[1.8rem] text-[0.9rem] font-semibold transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
  
  const activeClasses = 'bg-sub-lilac text-white shadow-[0_1px_4px_rgba(0,0,0,0.1)]'
  const inactiveClasses = 'bg-transparent text-[#606770]'

  return (
    <header 
      className="flex flex-shrink-0 items-center justify-center rounded-none bg-[#f7f2ff] py-4 sm:py-6 px-8 lg:rounded-tl-xl lg:rounded-tr-xl"
    >
      <div className="flex rounded-[2rem] bg-[#e4e6eb] p-[0.3rem]">
        <button
          className={`${baseButtonClasses} ${
            currentMode === 'normal' ? activeClasses : inactiveClasses
          }`}
          onClick={() => onModeChange('normal')}
          disabled={isStreaming}
        >
          채팅 모드
        </button>
        <button
          className={`${baseButtonClasses} ${
            currentMode === 'simple' ? activeClasses : inactiveClasses
          }`}
          onClick={() => onModeChange('simple')}
          disabled={isStreaming}
        >
          간단 모드
        </button>
      </div>
    </header>
  )
}

export default ChatHeader