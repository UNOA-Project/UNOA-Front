import React from 'react'
import styles from './FilterButton.module.css'

const FilterButton = ({ options, selected, onSelect, label }) => (
  <div className={styles.filterGroup}>
    <h3 className={styles.filterLabel}>{label}</h3>
    <div className={styles.buttonGroup}>
      {options.map(option => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`${styles.filterOption} ${selected === option ? styles.selected : ''}`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
)

export default FilterButton
