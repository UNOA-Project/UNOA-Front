import { useState } from 'react'
import MenuIcon from '../../assets/menu.svg?react'
import SendArrowIcon from '../../assets/sendarrow.svg?react'
import styles from './MessageInput.module.css'
import ArrowUpIcon from '../../assets/arrowup.svg?react'

const MessageInput = ({ onSendMessage, isStreaming, isConnected, inputRef }) => {
  const [inputMessage, setInputMessage] = useState('')
  const [isFaqVisible, setFaqVisible] = useState(true)

  const faqQuestions = [
    '요금제를 추천받고 싶어요.',
    '데이터 무제한 요금제 추천해 주세요.',
    '선택약정 할인에 대해 궁금해요.',
    'OTT 서비스가 포함된 요금제는 어떤 게 있나요?',
  ]

  const handleSubmit = e => {
    e.preventDefault()
    if (!inputMessage.trim() || isStreaming || !isConnected) return
    onSendMessage(inputMessage)
    setInputMessage('')
  }

  const handleFaqClick = question => {
    onSendMessage(question)
    setFaqVisible(false)
  }

  const getPlaceholder = () => {
    if (!isConnected) return '서버에 연결 중...'
    if (isStreaming) return '답변을 생성 중입니다...'
    return 'NOA에게 자유롭게 물어보세요'
  }

  return (
    <div className={styles.inputContainerWrapper}>
      {isFaqVisible && (
        <div className={`${styles.faqContainer} ${!isFaqVisible ? styles.faqHidden : ''}`}>
          <div className={styles.faqHeader}>
            <button
              type="button"
              className={styles.faqCloseButton}
              onClick={() => setFaqVisible(false)}
            >
              <ArrowUpIcon />
            </button>
            <span className={styles.faqTitle}>추천 질문</span>
          </div>

          {faqQuestions.map((q, index) => (
            <button key={index} className={styles.faqButton} onClick={() => handleFaqClick(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <button
          type="button"
          className={`${styles.iconButton} ${styles.menuButton}`}
          onClick={() => setFaqVisible(!isFaqVisible)}
          disabled={!isConnected}
        >
          <MenuIcon />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder={getPlaceholder()}
          className={styles.messageInput}
          disabled={isStreaming || !isConnected}
          autoFocus
        />

        <button
          type="submit"
          className={`${styles.iconButton} ${styles.sendButton}`}
          disabled={isStreaming || !inputMessage.trim() || !isConnected}
        >
          <SendArrowIcon />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
