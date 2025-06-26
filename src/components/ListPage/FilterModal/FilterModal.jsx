import { useEffect } from 'react'
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
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY

      // body 스크롤 막기 위함
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'

      // 언마운트 될때 다시 초기화해줌
      return () => {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  //해당 함수가 있는 요소의 내부 스크롤은 허용해줌
  const handleModalScroll = e => {
    e.stopPropagation()
  }

  if (!isOpen) return null

  return (
    <div
      className={styles.modalOverlay}
      onWheel={e => e.preventDefault()} // 휠 방지
      onTouchMove={e => e.preventDefault()} // 터치 방지
    >
      <div
        className={styles.modalContent}
        onWheel={handleModalScroll}
        onTouchMove={handleModalScroll}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>필터</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody} onScroll={handleModalScroll}>
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
