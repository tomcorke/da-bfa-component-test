import * as React from 'react'

import * as STYLES from './panel.scss'

interface PanelProps {
  children?: any
}

const Panel = ({ children }: PanelProps) => {
  return (
    <div className={STYLES.panelOuter}>
      <div className={STYLES.panelInner}>
        {children}
      </div>
    </div>
  )
}

export default Panel
