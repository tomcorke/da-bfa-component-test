import React from 'react'

import STYLES from './summary-value.scss'

const SummaryValue = ({ name, value }) => {
  return (
    <div className={STYLES.summaryValue} data-has-value={value > 0}>
      <div className={STYLES.name}>{name}</div>
      <div className={STYLES.value}>{value}</div>
    </div>
  )
}

export default SummaryValue
