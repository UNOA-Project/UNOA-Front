import { useEffect, useState } from 'react'
import styles from './TextAnimation.module.css'

const TextAnimation = ({ text, startDelay }) => {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  return (
    <div className={styles.wrapper}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={isVisible ? styles.charVisible : styles.charHidden}
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

export default TextAnimation
