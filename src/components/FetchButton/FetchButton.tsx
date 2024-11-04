import React from 'react'
import styles from './FetchButton.module.css'

interface FetchButtonProps {
  onFetch: () => void
}
const FetchButton: React.FC<FetchButtonProps> = ({ onFetch }) => {
  return (
    <button className={styles.fetchButton} onClick={onFetch}>
      Fetch People
    </button>
  )
}
export default FetchButton
