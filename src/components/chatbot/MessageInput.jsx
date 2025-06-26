import { useState } from 'react'
import MenuIcon from '../../assets/menu.svg?react'
import SendArrowIcon from '../../assets/sendarrow.svg?react'
import ArrowUpIcon from '../../assets/arrowup.svg?react'
import styles from './MessageInput.module.css'

const MessageInput = ({ onSendMessage, isStreaming, isConnected, inputRef, isWelcomeState }) => {
  const [inputMessage, setInputMessage] = useState('')
  const [isFaqVisible, setFaqVisible] = useState(false)
  // 1. 말풍선 표시 여부를 제어하는 상태 추가
  const [calloutVisible, setCalloutVisible] = useState(true)

  const faqQuestions = [
    '요금제를 추천받고 싶어요.',
    '데이터 무제한 요금제 추천해 주세요.',
    '선택약정 할인에 대해 궁금해요.',
    'OTT 서비스가 포함된 요금제는 어떤 게 있나요?',
  ]

  // 4. 메시지 전송 시 FAQ 컨테이너 닫기
  const handleSubmit = e => {
    e.preventDefault()
    if (!inputMessage.trim() || isStreaming || !isConnected) return
    onSendMessage(inputMessage)
    setInputMessage('')
    setFaqVisible(false)
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

  // 2. 메뉴 클릭 시 말풍선을 영구적으로 숨김
  const handleMenuClick = () => {
    setFaqVisible(!isFaqVisible)
    setCalloutVisible(false)
  }

  return (
    <div className={styles.inputContainerWrapper}>
      {/* 조건에 calloutVisible 추가 */}
      {isWelcomeState && calloutVisible && !isFaqVisible && (
        <div className={styles.faqCallout} onClick={() => setCalloutVisible(false)}>
          <div className={styles.faqCalloutText}>메뉴를 열면 자주찾는질문을 확인할 수 있어요!</div>
          <div className={styles.faqCalloutArrow} />
        </div>
      )}

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
          onClick={handleMenuClick} 
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
