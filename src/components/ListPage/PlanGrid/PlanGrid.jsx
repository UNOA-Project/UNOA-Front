import React, { useEffect, useMemo, useState } from 'react'
import PlanCard from '../PlanCard/PlanCard'
import styles from './PlanGrid.module.css'
import unoaXimg from '@/assets/유노아x팻말.png'
//요금제 카드 그리드 컴포넌트
const PlanGrid = ({ plans, onResetFilters, resetTrigger }) => {
  const [visibleCount, setVisibleCount] = useState(6) //초기에 보여줄 카드수

  //탭 변경되면 페이지네이션 초기화
  useEffect(() => {
    setVisibleCount(6)
  }, [resetTrigger])

  //현재 보여줄 요금제들
  const visiblePlans = useMemo(() => {
    return plans.slice(0, visibleCount)
  }, [plans, visibleCount])

  //더보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  //더 보여줄 요금제가 있는지 확인
  const hasMore = visibleCount < plans.length

  //요금제가 없을 때
  if (plans.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.unoaImgCon}>
          <img src={unoaXimg} alt="유노아x팻말이미지" />
        </div>
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
        {visiblePlans.map(plan => (
          <PlanCard key={plan._id} plan={plan} />
        ))}
      </div>

      {hasMore && (
        <div className={styles.moreButtonContainer}>
          <button className={styles.moreButton} onClick={handleLoadMore}>
            요금제 더보기 ({visibleCount}/{plans.length})
          </button>
        </div>
      )}

      {/*모든 요금제를 다 보여준 경우 */}
      {!hasMore && plans.length > 6 && (
        <div className={styles.allLoadedContainer}>
          <div className={styles.allLoadedMessage}>
            모든 요금제를 확인했습니다 ({plans.length}개)
          </div>
          <button
            className={styles.backToTopButton}
            onClick={() => {
              setVisibleCount(6)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            처음으로 돌아가기
          </button>
        </div>
      )}
    </>
  )
}

export default PlanGrid
