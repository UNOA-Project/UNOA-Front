import React, { useState } from 'react'
import usePlanFilter from '../../hooks/usePlanFilter'
import TabMenu from '../TabMenu/TabMenu'
import FilterSort from '../FilterSort/FilterSort'
import PlanGrid from '../PlanGrid/PlanGrid'
import FilterModal from '../FilterModal/FilterModal'
import styles from './PlanCardSystem.module.css'

const PlanCardSystem = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const {
    appliedFilters,
    tempFilters,
    filteredPlans,
    setTempFilters,
    applyFilters,
    resetFilters,
    toggleApp,
    changeCategory,
  } = usePlanFilter()

  const handleApplyFilters = () => {
    applyFilters()
    setIsFilterOpen(false)
  }

  const getCategoryTitle = () => {
    const titles = {
      '5GLTE': '5G/LTE 요금제',
      Online: '온라인 전용 요금제',
      TabWatch: '태블릿/스마트워치 요금제',
      Dual: '듀얼넘버 플러스',
    }
    return titles[appliedFilters.category] || '요금제'
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <TabMenu selectedCategory={appliedFilters.category} onCategoryChange={changeCategory} />

        <FilterSort onFilterOpen={() => setIsFilterOpen(true)} appliedFilters={appliedFilters} />

        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{getCategoryTitle()}</h2>
          <p className={styles.categoryDescription}>
            {filteredPlans.length}개의 요금제가 있습니다.
          </p>
        </div>

        <PlanGrid plans={filteredPlans} onResetFilters={resetFilters} />
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        onApply={handleApplyFilters}
        onReset={resetFilters}
        onToggleApp={toggleApp}
      />
    </div>
  )
}

export default PlanCardSystem
