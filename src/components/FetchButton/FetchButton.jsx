import React from 'react'
import styles from './FetchButton.module.css'
const FetchButton = ({ onFetch }) => {
  return (
    <button className={styles.fetchButton} onClick={onFetch}>
      Fetch people
    </button>
  )
}
export default FetchButton
