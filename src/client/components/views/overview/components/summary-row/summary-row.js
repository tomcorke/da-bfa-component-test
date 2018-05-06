import React from 'react'

import STYLES from './summary-row.scss'

const SummaryRow = ({ children }) => {
  return (
    <div className={STYLES.summaryRow}>{children}</div>
  )
}

export default SummaryRow
