import React, { useRef, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './SolutionSection.module.css'
import mascot from '../../assets/section/solution.png'
import SolutionTextImg from '../../assets/section/Solutiontext.png'

const TOTAL_BUBBLES = 20

const SolutionSection = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.7, triggerOnce: false })
  const containerRef = useRef(null)
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    if (inView) {
      const generated = Array.from({ length: TOTAL_BUBBLES }, () => ({
        left: Math.random() * 90, // 0% ~ 90%
        scale: Math.random() * 0.1 + 0.5, // 0.5 ~ 1.1
        delay: Math.random() * 1.5, // 0 ~ 1.5s
      }))
      setBubbles(generated)
    }
  }, [inView])

  return (
    <section className={styles.wrapper} ref={containerRef}>
      {/* 비눗방울 */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className={styles.bubble}
          style={{
            left: `${b.left}%`,
            transform: `scale(${b.scale})`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* 텍스트 + 마스코트 */}
      <div className={styles.content}>
        <div ref={sectionRef} className={`${styles.imageCircle} ${inView ? styles.show : ''}`}>
          <img src={SolutionTextImg} alt="Solution Text" className="solution-image" />
          <img src={mascot} alt="UNOA 캐릭터" className={styles.image} />
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
