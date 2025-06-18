import React, { useState, useEffect, useRef } from 'react'
import styles from './BenefitsSection.module.css'
import mascot1 from '../../assets/section/benefit1.png'
import mascot2 from '../../assets/section/benefit2.png'
import mascot3 from '../../assets/section/benefit3.png'
import mascot4 from '../../assets/section/benefit4.png'

const mascotData = [
  { img: mascot1, label: '영화 보고' },
  { img: mascot2, label: '밥 먹고' },
  { img: mascot3, label: '쇼핑 하고' },
  { img: mascot4, label: '놀자' },
]

const logos = [
  '/logos/lg.png',
  '/logos/cgv.png',
  '/logos/onestore.png',
  '/logos/gs25.png',
  '/logos/brandB.png',
  '/logos/touslesjours.png',
  '/logos/onestore.png',
  '/logos/megabox.png',
  '/logos/gsfresh.png',
  '/logos/uplus.png',
  '/logos/papajohns.png',
]

const BenefitCenterSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [translateX, setTranslateX] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height

      if (sectionTop <= 0 && Math.abs(sectionTop) < sectionHeight) {
        const ratio = Math.min(Math.abs(sectionTop) / sectionHeight, 1)
        const index = Math.floor(ratio * mascotData.length)
        if (index !== currentIndex && index < mascotData.length) {
          setAnimate(false)
          setTimeout(() => {
            setCurrentIndex(index)
            setAnimate(true)
          }, 100)
        }

        // 전체 왼쪽 → 오른쪽 슬라이드 거리 (100% 이동 × 2회 반복)
        const totalWidth = logos.length * 160 * 4 // 로고 크기 * 개수 * 2
        setTranslateX(ratio * totalWidth * 0.3)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentIndex])

  return (
    <section ref={sectionRef} className={styles.scrollWrapper}>
      <div className={styles.stickyContent}>
        <div
          className={styles.logoBackground}
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((src, idx) => (
            <div className={styles.logoItem} key={idx}>
              <img src={src} alt={`logo-${idx}`} />
            </div>
          ))}
        </div>

        <div className={styles.character}>
          <img
            src={mascotData[currentIndex].img}
            alt="캐릭터"
            className={`${styles.mascot} ${animate ? styles.animated : ''}`}
          />
          <p className={`${styles.label} ${animate ? styles.animated : ''}`}>
            {mascotData[currentIndex].label}
          </p>
        </div>
      </div>
    </section>
  )
}

export default BenefitCenterSection
