import React from 'react'
import styles from './TabMenu.module.css'

const TabMenu = ({ selectedCategory, onCategoryChange }) => {
  const tabs = [
    { key: '5GLTE', label: '5G/LTE' },
    { key: 'Online', label: '온라인 전용 요금제' },
    { key: 'TabWatch', label: '태블릿/스마트워치' },
    { key: 'Dual', label: '듀얼넘버 플러스' },
  ]

  return (
    <div className={styles.tabContainer}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onCategoryChange(tab.key)}
          className={`${styles.tab} ${selectedCategory === tab.key ? styles.activeTab : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabMenu
