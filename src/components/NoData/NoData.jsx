import React from 'react'
import styles from './NoData.module.css'
const NoData = () => {
  return (
    <div className={styles.noData}>
      No data loaded. Click "Fetch people" to load data
    </div>
  )
}
export default NoData
