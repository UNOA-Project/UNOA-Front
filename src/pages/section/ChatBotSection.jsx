import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './ChatBotSection.module.css'
import leftMockup from '../../assets/section/ChatBotiphone1.png'
import rightMockup from '../../assets/section/ChatBotiphone2.png'

const ChatBotSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'], // 등장 위치 조절
  })

  const leftY = useTransform(scrollYProgress, [0, 1], [200, 0])
  const leftOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rightY = useTransform(scrollYProgress, [0, 1], [-100, 0])
  const rightOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className={styles.wrapper} ref={sectionRef}>
      <div className={styles.row}>
        <motion.div className={styles.leftBox} style={{ y: leftY, opacity: leftOpacity }}>
          <h2>지금 나에게 맞는 요금제가 궁금하다면?</h2>
          <img src={leftMockup} alt="설문 화면" />
        </motion.div>

        <motion.div className={styles.rightBox} style={{ y: rightY, opacity: rightOpacity }}>
          <img src={rightMockup} alt="챗봇 화면" />
          <p className={styles.caption}>챗봇 NOA가 쉽고 빠르게 추천해드릴게요!</p>
          <button className={styles.ctaButton}>요금제 추천 받기</button>
        </motion.div>
      </div>
    </section>
  )
}

export default ChatBotSection
