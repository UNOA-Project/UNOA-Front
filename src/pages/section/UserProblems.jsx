import React, { useEffect, useState } from 'react'
import styles from './UserProblems.module.css'

const problems = [
  '지금 요금제는 괜찮을까?',
  '놓치고 있던 혜택이 뭐가있지?',
  '너무 비싸게 쓰는 건 아니겠지?',
  '데이터는 남고, 음성은 부족하고...',
  '멤버십 혜택은 잘 받고 있는 걸까?',
  '이런 고민들',
]

const UserProblems = () => {
  const [bubbles, setBubbles] = useState([])
  const [isOverlayActive, setIsOverlayActive] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // 중앙에 비워둘 영역 설정 (20% ~ 70% 영역)
      const exclusionZoneStart = 20
      const exclusionZoneEnd = 70

      let top, left

      // 1. 가로(left) 위치를 먼저 전체 범위(5% ~ 85%) 내에서 랜덤하게 정합니다.
      left = Math.random() * 80 + 5

      // 2. 가로 위치가 중앙 영역(20% ~ 70%)에 포함되는지 확인합니다.
      if (left > exclusionZoneStart && left < exclusionZoneEnd) {
        // 2-1. 중앙이라면, 세로(top) 위치는 가장자리(위 또는 아래)로 강제합니다.
        if (Math.random() < 0.5) {
          // 위쪽 가장자리 (5% ~ 20%)
          top = Math.random() * (exclusionZoneStart - 5) + 5
        } else {
          // 아래쪽 가장자리 (70% ~ 85%)
          top = Math.random() * (85 - exclusionZoneEnd) + exclusionZoneEnd
        }
      } else {
        // 2-2. 가장자리라면, 세로(top) 위치는 어디든 괜찮습니다. (5% ~ 85%)
        top = Math.random() * 80 + 5
      }

      const newBubble = {
        id: Date.now(),
        text: problems[Math.floor(Math.random() * (problems.length - 1))],
        top: top,
        left: left,
      }

      setBubbles(prev => [...prev, newBubble])

      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
      }, 3000)
    }, 300)

    return () => clearInterval(interval)
  }, [])
  // 스크롤에 따라 오버레이 표시 및 activeIndex 결정
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const start = window.innerHeight
      const end = window.innerHeight * 2

      const isActive = scrollY > start && scrollY < end
      setIsOverlayActive(isActive)

      if (isActive) {
        const ratio = (scrollY - start) / (end - start)
        const idx = Math.floor(ratio * problems.length)
        setActiveIndex(Math.min(problems.length - 1, idx))
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.wrapper}>
        {bubbles.map(b => (
          <div
            key={b.id}
            className={styles.bubble}
            style={{ top: `${b.top}%`, left: `${b.left}%` }}
          >
            {b.text}
          </div>
        ))}
      </div>

      <div className={`${styles.overlay} ${isOverlayActive ? styles.active : ''}`}>
        <div className={styles.sloganBox}>
          {problems.map((text, i) => (
            <p
              key={i}
              className={`${styles.slogan} ${i === activeIndex ? styles.active : styles.inactive}`}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProblems
