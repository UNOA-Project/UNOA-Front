import React, { useRef, useState, useEffect } from 'react'
import styles from './TabMenu.module.css'

const TabMenu = ({ selectedCategory, onCategoryChange }) => {
  const tabContainerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const tabs = [
    { key: '5G/LTE 요금제', label: '5G/LTE' },
    { key: '온라인 다이렉트 요금제', label: '온라인 전용 요금제' },
    { key: '태블릿/워치 요금제', label: '태블릿/스마트워치' },
    { key: '듀얼심 요금제', label: '듀얼넘버 플러스' },
  ]

  const handleMouseDown = e => {
    setIsDragging(true)
    setStartX(e.pageX - tabContainerRef.current.offsetLeft)
    setScrollLeft(tabContainerRef.current.scrollLeft)
    tabContainerRef.current.style.cursor = 'grabbing'
    tabContainerRef.current.style.userSelect = 'none'
  }

  // 마우스 드래그 중일때
  const handleMouseMove = e => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - tabContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // 스크롤 속도 조절 하는 부분(속도 조절하려면 값 수정)
    tabContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // 마우스 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false)
    tabContainerRef.current.style.cursor = 'grab'
    tabContainerRef.current.style.userSelect = 'auto'
  }

  // 마우스가 컨테이너를 벗어났을 때
  const handleMouseLeave = () => {
    setIsDragging(false)
    tabContainerRef.current.style.cursor = 'grab'
    tabContainerRef.current.style.userSelect = 'auto'
  }

  // 탭 클릭 시 드래그 중이면 클릭 무시
  const handleTabClick = tabKey => {
    if (!isDragging) {
      onCategoryChange(tabKey)
    }
  }

  useEffect(() => {
    const container = tabContainerRef.current
    if (container) {
      container.style.cursor = 'grab'
    }
  }, [])

  return (
    <div
      ref={tabContainerRef}
      className={styles.tabContainer}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => handleTabClick(tab.key)}
          className={`${styles.tab} ${selectedCategory === tab.key ? styles.activeTab : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabMenu
