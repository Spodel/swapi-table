import React from 'react'
import styles from './ClearButton.module.css'

interface ClearButtonProps {
  onClear: () => void
  disabled: boolean
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear, disabled }) => {
  return (
    <button
      className={styles.clearButton}
      onClick={onClear}
      disabled={disabled}
    >
      Clear Table
    </button>
  )
}
export default ClearButton
