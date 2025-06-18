import React from 'react'
import styles from './FilterSort.module.css'

const FilterSort = () => {
  return (
    <div className={styles.filterSort}>
      <div className={styles.sortButtons}>
        <button className={styles.sortButton}>
          인기순 <span className={styles.arrow}>▼</span>
        </button>
        <button className={styles.sortButton}>
          전체 <span className={styles.arrow}>▼</span>
        </button>
      </div>
      <button className={styles.filterLink}>필터</button>
    </div>
  )
}

export default FilterSort
