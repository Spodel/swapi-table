import React from 'react'
import styles from './NoData.module.css'

const NoData: React.FC = () => {
  return (
    <div className={styles.noData}>
      No data loaded. Click "Fetch People" to load data.
    </div>
  )
}
export default NoData
