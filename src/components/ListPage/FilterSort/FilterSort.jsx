import { useEffect, useRef, useState } from 'react'
import styles from './FilterSort.module.css'

const FilterSort = ({
  onFilterOpen,
  onSortChange,
  onAgeGroupChange,
  currentSort,
  currentAgeGroup,
  selectedCategory,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isAgeOpen, setIsAgeOpen] = useState(false)

  const sortRef = useRef(null)
  const ageRef = useRef(null)

  //정렬 옵션
  const sortOptions = [
    { value: 'popularity', label: '인기순' },
    { value: 'priceLow', label: '낮은 가격순' },
    { value: 'priceHigh', label: '높은 가격순' },
    { value: 'dataHigh', label: '데이터 많은 순' },
  ]

  //나이 옵션
  const ageOptions = [
    { value: 'all', label: '전체' },
    { value: '20', label: '20대' },
    { value: '30', label: '30대' },
    { value: '40', label: '40대' },
    { value: '50', label: '50대' },
    { value: '60', label: '60대 이상' },
  ]

  //외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = event => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false)
      }
      if (ageRef.current && !ageRef.current.contains(event.target)) {
        setIsAgeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  //요금제 정렬 핸들러
  const handleSortSelect = sortValue => {
    onSortChange(sortValue)
    setIsSortOpen(false)
  }

  //나이 선택 핸들러
  const handleAgeSelect = ageValue => {
    onAgeGroupChange(ageValue)
    setIsAgeOpen(false)
  }

  //현재 선택된 라벨 찾기
  //요금제 정렬
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort)
    return option ? option.label : '인기순'
  }

  //나이 정렬
  const getCurrentAgeLabel = () => {
    const option = ageOptions.find(opt => opt.value === currentAgeGroup)
    return option ? option.label : '전체'
  }
  return (
    <div className={styles.filterSort}>
      <div className={styles.sortButtons}>
        {/* 요금제(인기순 등..) 드롭다운 */}
        <div className={styles.dropdown} ref={sortRef}>
          <button className={styles.dropdownButton} onClick={() => setIsSortOpen(!isSortOpen)}>
            {getCurrentSortLabel()}
            <span className={`${styles.arrow} ${isSortOpen ? styles.arrowUp : ''}`}>
              <img src="../../../images/icons/down_arrow.png" alt="아래화살표" />
            </span>
          </button>

          {isSortOpen && (
            <div className={styles.dropdownMenu}>
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  className={`${styles.dropdownItem} ${currentSort === option.value ? styles.activeItem : ''}`}
                  onClick={() => handleSortSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* 나이대 드롭다운 */}
        {selectedCategory !== '5G/LTE 요금제' ? null : (
          <div className={styles.dropdown} ref={ageRef}>
            <button className={styles.dropdownButton} onClick={() => setIsAgeOpen(!isAgeOpen)}>
              {getCurrentAgeLabel()}
              <span className={`${styles.arrow} ${isAgeOpen ? styles.arrowUp : ''}`}>
                <img src="../../../images/icons/down_arrow.png" alt="아래화살표" />
              </span>
            </button>

            {isAgeOpen && (
              <div className={styles.dropdownMenu}>
                {ageOptions.map(option => (
                  <button
                    key={option.value}
                    className={`${styles.dropdownItem} ${
                      currentAgeGroup === option.value ? styles.activeItem : ''
                    }`}
                    onClick={() => handleAgeSelect(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <button onClick={onFilterOpen} className={styles.filterLink}>
        <img src="/images/icons/filter_icon.svg" alt="" />
        필터
      </button>
    </div>
  )
}

export default FilterSort
