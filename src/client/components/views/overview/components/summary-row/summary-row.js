import React from 'react'

import SummaryValue from '../summary-value'

import STYLES from './summary-row.scss'

const SummaryRow = ({ title, values }) => {
  return (
    <div className={STYLES.summaryRow}>
      <div className={STYLES.summaryRowTitle}>
        {title}
      </div>
      <div className={STYLES.summaryRowTags}>
        {values.map(t => <SummaryValue key={t.name} name={t.name} value={t.count} />)}
      </div>
    </div>
  )
}

export default SummaryRow
