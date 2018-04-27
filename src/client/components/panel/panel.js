import React from 'react'

import STYLES from './panel.scss'

const Panel = ({ children }) => {
  return (
    <div className={STYLES.panelOuter}>
      <div className={STYLES.panelInner}>
        {children}
      </div>
    </div>
  )
}

export default Panel
