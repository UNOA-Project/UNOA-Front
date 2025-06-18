import React from 'react'

import styles from './AppSelector.module.css'
import { appsData } from '../../data/appsData'

// 필터 모달 내부 혜택 앱 컴포넌트
const AppSelector = ({ selectedApps, onToggleApp }) => {
  return (
    <div className={styles.appSelector}>
      <h3 className={styles.title}>혜택 앱</h3>
      <div className={styles.appGrid}>
        {appsData.map(app => (
          <div
            key={app.name}
            onClick={() => onToggleApp(app.name)}
            className={`${styles.appItem} ${
              selectedApps.includes(app.name) ? styles.selected : ''
            }`}
          >
            <div className={`${styles.appIcon} ${app.color}`}>{app.icon}</div>
            <div className={styles.appName}>{app.name}</div>
          </div>
        ))}
      </div>
      {selectedApps.length > 0 && (
        <div className={styles.selectedCount}>{selectedApps.length}개 앱 선택됨</div>
      )}
    </div>
  )
}

export default AppSelector
