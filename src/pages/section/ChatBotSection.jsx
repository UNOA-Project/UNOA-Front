import React, { useEffect, useRef, useState } from 'react'
import styles from './ChatBotSection.module.css'
import leftMockup from '../../assets/section/ChatBotiphone1.png'
import rightMockup from '../../assets/section/ChatBotiphone2.png'

const ChatBotSection = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.4,
      }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.wrapper} ref={sectionRef}>
      <div className={styles.row}>
        <div className={`${styles.leftBox} ${isVisible ? styles.showLeft : ''}`}>
          <h2>지금 나에게 맞는 요금제가 궁금하다면?</h2>
          <img src={leftMockup} alt="설문 화면" />
        </div>

        <div className={`${styles.rightBox} ${isVisible ? styles.showRight : ''}`}>
          <img src={rightMockup} alt="챗봇 화면" />
          <p className={styles.caption}>챗봇 NOA가 쉽고 빠르게 추천해드릴게요!</p>
          <button className={styles.ctaButton}>요금제 추천 받기</button>
        </div>
      </div>
    </section>
  )
}

export default ChatBotSection
