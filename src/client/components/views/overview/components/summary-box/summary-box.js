import React from 'react'

import STYLES from './summary-box.scss'

const SummaryBox = ({ children }) => {
  return (
    <div className={STYLES.summaryBox}>{children}</div>
  )
}

export default SummaryBox
