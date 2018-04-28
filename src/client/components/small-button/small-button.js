import React from 'react'

import STYLES from './small-button.scss'

const SmallButton = ({ active, children, onClick }) => {
  const classNames = `${STYLES.smallButton} ${active ? STYLES.active : ''}`
  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  )
}

export default SmallButton
