import React from 'react'

import STYLES from './warning-indicator.scss'

const getRepeats = (severity) => {
  if (severity <= 3) { return severity }
  return 1
}

const WarningIndicator = ({ severity, message }) => {
  const elements = []
  for (let i = 0; i < getRepeats(severity); i++) {
    elements.push(<div className={STYLES.severityIndicator} key={i} />)
  }
  return <div className={STYLES.warningIndicator} data-severity={severity} data-message={message} title={message}>
    {elements}
  </div>
}

export default WarningIndicator
