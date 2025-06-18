import React from 'react'
import PlanCard from '../PlanCard/PlanCard'
import styles from './PlanGrid.module.css'

//요금제 카드 그리드 컴포넌트
const PlanGrid = ({ plans, onResetFilters }) => {
  if (plans.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>😔</div>
        <div className={styles.emptyMessage}>조건에 맞는 요금제가 없습니다</div>
        <button onClick={onResetFilters} className={styles.resetButton}>
          필터 초기화
        </button>
      </div>
    )
  }

  return (
    <>
      <div className={styles.planGrid}>
        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className={styles.moreButtonContainer}>
        <button className={styles.moreButton}>요금제 더보기 ({plans.length + 10}개)</button>
      </div>
    </>
  )
}

export default PlanGrid
