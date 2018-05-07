import React from 'react'

import STYLES from './warning-indicator.scss'

const WarningIndicator = ({ severity, message }) => {
  const elements = []
  for (let i = 0; i < severity; i++) {
    elements.push(<div className={STYLES.severityIndicator} key={i} />)
  }
  return <div className={STYLES.warningIndicator} data-severity={severity} data-message={message} title={message}>
    {elements}
  </div>
}

export default WarningIndicator
