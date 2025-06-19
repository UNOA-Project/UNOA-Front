import React, { useMemo, useState } from 'react'
import usePlanFilter from '../../hooks/usePlanFilter'
import TabMenu from '../TabMenu/TabMenu'
import FilterSort from '../FilterSort/FilterSort'
import PlanGrid from '../PlanGrid/PlanGrid'
import FilterModal from '../FilterModal/FilterModal'
import styles from './PlanCardSystem.module.css'

const PlanCardSystem = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  //정렬 및 나이대 필터 변수
  const [currentSort, setCurrentSort] = useState('popularity')
  const [currentAgeGroup, setCurrentAgeGroup] = useState('all')

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

  const getSortedPlans = useMemo(() => {
    let sortedPlans = [...filteredPlans]

    switch (currentSort) {
      case 'popularity':
        //인기순 정렬
        sortedPlans.sort((a, b) => {
          const rankA = parseInt(a.popularityRank) || 999
          const rankB = parseInt(b.popularityRank) || 999
          return rankA - rankB
        })
        break

      case 'priceLow':
        // 낮은 가격순
        sortedPlans.sort((a, b) => {
          const priceA = parseInt(a.price) || 0
          const priceB = parseInt(b.price) || 0
          return priceA - priceB
        })
        break

      case 'priceHigh':
        // 높은 가격순
        sortedPlans.sort((a, b) => {
          const priceA = parseInt(a.price) || 0
          const priceB = parseInt(b.price) || 0
          return priceB - priceA
        })
        break

      case 'dataHigh':
        // 데이터 많은 순
        sortedPlans.sort((a, b) => {
          const getDataValue = dataStr => {
            if (!dataStr) return 0

            // 무제한인 경우 최고값
            if (dataStr.includes('무제한') || dataStr.toLowerCase().includes('unlimited')) {
              return 999999
            }

            // 숫자 추출 (GB, MB 단위 고려)
            const numbers = dataStr.match(/(\d+(?:\.\d+)?)/g)
            if (!numbers) return 0

            let value = parseFloat(numbers[0])

            // 단위 변환 (GB = 1000MB로 계산)
            if (dataStr.toUpperCase().includes('GB')) {
              value = value * 1000
            } else if (dataStr.toUpperCase().includes('TB')) {
              value = value * 1000000
            }
            // MB는 그대로

            return value
          }

          const dataA = getDataValue(a.data)
          const dataB = getDataValue(b.data)
          return dataB - dataA // 내림차순 (많은 순)
        })
        break

      default:
        // 기본값은 그대로
        break
    }

    //나이대 필터 적용
    if (currentAgeGroup !== 'all') {
      sortedPlans = sortedPlans.filter(plan => {
        if (!plan.ageGroup) return false

        const planAge = parseInt(plan.ageGroup)
        const filterAge = parseInt(currentAgeGroup)

        // 나이대 범위 매칭 (±5년 범위)
        if (currentAgeGroup === '60') {
          // 60대 이상
          return planAge >= 60
        } else {
          // 20대, 30대, 40대, 50대
          return planAge >= filterAge && planAge < filterAge + 10
        }
      })
    }

    return sortedPlans
  }, [filteredPlans, currentSort, currentAgeGroup])

  //정렬 변경 핸들러
  const handleSortChange = sortType => {
    setCurrentSort(sortType)
  }

  //나이대 필터 변경 핸들러
  const handleAgeGroupChange = ageGroup => {
    setCurrentAgeGroup(ageGroup)
  }

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

        <FilterSort
          onFilterOpen={() => setIsFilterOpen(true)}
          onSortChange={handleSortChange}
          onAgeGroupChange={handleAgeGroupChange}
          currentSort={currentSort}
          currentAgeGroup={currentAgeGroup}
        />

        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{getCategoryTitle()}</h2>
          <p className={styles.categoryDescription}>
            {filteredPlans.length}개의 요금제가 있습니다.
          </p>
        </div>

        <PlanGrid
          plans={getSortedPlans} // 정렬된 결과 전달
          onResetFilters={() => {
            resetFilters()
            setCurrentSort('popularity')
            setCurrentAgeGroup('all')
          }}
        />
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        onApply={handleApplyFilters}
        onReset={() => {
          resetFilters()
          setCurrentSort('popularity')
          setCurrentAgeGroup('all')
        }}
        onToggleApp={toggleApp}
      />
    </div>
  )
}

export default PlanCardSystem
