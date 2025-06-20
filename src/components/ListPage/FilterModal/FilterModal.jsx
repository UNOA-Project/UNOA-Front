import React from 'react'
import FilterButton from '../FilterButton/FilterButton'
import AppSelector from '../AppSelector/AppSelector'
import { filterOptions } from './../../../data/appsData'
import styles from './FilterModal.module.css'

const FilterModal = ({
  isOpen,
  onClose,
  tempFilters,
  setTempFilters,
  onApply,
  onReset,
  onToggleApp,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>필터</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <FilterButton
            options={filterOptions.networks}
            selected={tempFilters.network}
            onSelect={value => setTempFilters(prev => ({ ...prev, network: value }))}
            label="네트워크"
          />

          <FilterButton
            options={filterOptions.priceFilter}
            selected={tempFilters.dataPrice}
            onSelect={value => setTempFilters(prev => ({ ...prev, dataPrice: value }))}
            label="가격대"
          />

          <FilterButton
            options={filterOptions.dataTypes}
            selected={tempFilters.dataType}
            onSelect={value => setTempFilters(prev => ({ ...prev, dataType: value }))}
            label="데이터 타입"
          />

          <AppSelector selectedApps={tempFilters.selectedApps} onToggleApp={onToggleApp} />
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onReset} className={styles.resetButton}>
            초기화
          </button>
          <button onClick={onApply} className={styles.applyButton}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
