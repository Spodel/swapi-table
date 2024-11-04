import React from 'react'
import styles from './ClearButton.module.css'
const ClearButton = ({ onClear }) => {
  return (
    <button className={styles.clearButton} onClick={onClear}>
      Clear data
    </button>
  )
}
export default ClearButton
