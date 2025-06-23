import RefreshIcon from '../../assets/refresh.svg?react';

const ChatHeader = ({ currentMode, onModeChange, isStreaming, onReset }) => {
  const baseButtonClasses =
    'py-3 px-5 sm:py-2.5 sm:px-7 rounded-[1.8rem] font-semibold transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'

  const activeClasses = 'bg-sub-lilac text-white shadow-[0_1px_4px_rgba(0,0,0,0.1)]';
  const inactiveClasses = 'bg-transparent text-[#606770]';

  return (
    <header className="flex flex-shrink-0 items-center justify-between rounded-none px-4 sm:px-6 py-4 lg:rounded-tl-xl lg:rounded-tr-xl">
      
      {/* 왼쪽 공간을 차지하여 중앙 정렬의 균형을 맞추는 역할 */}
      <div className="w-10 h-10" aria-hidden="true"></div> 

      {/* 가운데 모드 변경 버튼 그룹 */}
      <div className="flex rounded-[2rem] bg-[#e4e6eb]">
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
          } -ml-3`}
          onClick={() => onModeChange('simple')}
          disabled={isStreaming}
        >
          간단 모드
        </button>
      </div>

      <button
        onClick={onReset}
        disabled={isStreaming}
        className={`group w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 disabled:opacity-50 transition-colors ${
          currentMode !== 'normal' ? 'invisible' : ''
        }`}
        aria-label="대화 초기화"
      >
        <RefreshIcon className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
      </button>
    </header>
  );
};

export default ChatHeader;
