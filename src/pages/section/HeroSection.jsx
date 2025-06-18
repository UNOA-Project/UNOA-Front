import React, { useRef, useEffect, useState } from 'react'
import styles from './HeroSection.module.css'
import mouse from '../../assets/section/mouse.png'

// UNOA 로고 컴포넌트 (U+NOA 형태)
const UoaLogo = () => {
  const svgRef = useRef(null)
  const [isDrawn, setDrawn] = useState(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const elements = svg.querySelectorAll('path, line') // path와 +기호의 line 포함
    elements.forEach(el => {
      const length = el.getTotalLength?.()
      if (length) {
        el.style.strokeDasharray = length
        el.style.strokeDashoffset = length
        el.style.transition = 'stroke-dashoffset 2s ease'
      }
    })

    setTimeout(() => {
      setDrawn(true)
      elements.forEach(el => {
        if (el.style.strokeDashoffset !== undefined) {
          el.style.strokeDashoffset = 0
        }
      })
    }, 2000)
  }, [])

  return (
    <div className={styles.uoaLogoWrapper}>
      <svg ref={svgRef} className={styles.uoaLogoSvg} viewBox="0 -10 250 70">
        <g transform="translate(5, 0)">
          {/* + 기호 */}
          <path
            className={styles.plusPath}
            d="M68 0 V20 M58 10 H78"
            fill="none"
            stroke="#e6007e"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* U */}
          <path
            className={styles.uPath}
            d="M15 10 V40 C15 55, 45 55, 45 40 V10"
            fill="none"
            strokeWidth="10"
          />
          {/* N */}
          <path className={styles.nPath} d="M90 50 V10 L120 50 V10" fill="none" strokeWidth="10" />
          {/* O */}
          <path
            className={styles.oPath}
            d="M135 30 a19,19 0 1 1 40,0 a19,19 0 1 1 -40,0"
            fill="none"
            strokeWidth="10"
          />
          {/* A */}
          <path
            className={styles.aPath}
            d="M185 50 L205 10 L225 50 M195 38 H215"
            fill="none"
            strokeWidth="10"
          />
        </g>
      </svg>
    </div>
  )
}

// 텍스트 애니메이션
const TextAnimation = ({ text, startDelay }) => {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  return (
    <div className={styles.sloganWrapper}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={styles.char}
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

// 서브 슬로건
const SubSlogans = () => {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`${styles.subSlogans} ${isVisible ? styles.visible : ''}`}>
      <p>추천, 분석, 혜택 정리까지 한 곳에서</p>
      <p>나에게 딱 맞는 요금제 관리 도우미</p>
    </div>
  )
}

// 스크롤 안내
const Scrollecomment = () => {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`${styles.Scrollecomment} ${isVisible ? styles.visible : ''}`}>
      <p>scroll to view more</p>
      <img src={mouse} alt="scroll icon" className={styles.scrollIcon} />
    </div>
  )
}

// 메인 HeroSection
function HeroSection() {
  const sloganText = '한 번에 쉽게, 나한테 딱 맞게'

  return (
    <section className={`${styles.app} ${styles.appHeader}`}>
      <UoaLogo />
      <TextAnimation text={sloganText} startDelay={500} />
      <SubSlogans />
      <Scrollecomment />
    </section>
  )
}

export default HeroSection
