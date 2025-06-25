import styles from './TabMenu.module.css'

const TabMenu = ({ selectedCategory, onCategoryChange }) => {
  const tabs = [
    { key: '5G/LTE 요금제', label: '5G/LTE' },
    { key: '온라인 다이렉트 요금제', label: '온라인 전용 요금제' },
    { key: '태블릿/워치 요금제', label: '태블릿/스마트워치' },
    { key: '듀얼심 요금제', label: '듀얼넘버 플러스' },
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
