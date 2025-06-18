// src/components/ChatContainer.jsx
import ChatMode from './ChatMode';
import SimpleMode from './SimpleMode';
import appStyles from '../App.module.css'; // App의 스타일을 가져옴

const ChatContainer = (props) => {
  const { currentMode } = props;

  return (
  <div className={appStyles.chatContainer}> 
      {currentMode === 'normal' ? (
        <ChatMode {...props} />
      ) : (
        <SimpleMode {...props} />
      )}
    </div>
  );
};

export default ChatContainer;