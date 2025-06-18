// src/components/ChatHeader.jsx
import React from 'react';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ currentMode, onModeChange, isStreaming }) => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.modeToggleContainer}>
        <button
          className={`${styles.modeButton} ${currentMode === 'normal' ? styles.active : ''}`}
          onClick={() => onModeChange('normal')}
          disabled={isStreaming}
        >
          채팅 모드
        </button>
        <button
          className={`${styles.modeButton} ${currentMode === 'simple' ? styles.active : ''}`}
          onClick={() => onModeChange('simple')}
          disabled={isStreaming}
        >
          간단 모드
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;