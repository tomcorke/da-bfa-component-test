import * as React from 'react'

import * as STYLES from './small-button.scss'

interface SmallButtonProps {
  active: boolean
  children?: any
  onClick: () => any
}

const SmallButton = ({ active, children, onClick }: SmallButtonProps) => {
  const classNames = `${STYLES.smallButton} ${active ? STYLES.active : ''}`
  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  )
}

export default SmallButton
