import React from 'react'
import styles from './ClearButton.module.css'

interface ClearButtonProps {
  onClear: () => void
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <button className={styles.clearButton} onClick={onClear}>
      Clear Table
    </button>
  )
}
export default ClearButton
