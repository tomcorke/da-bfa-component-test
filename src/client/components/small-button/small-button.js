import React from 'react'

import STYLES from './small-button.scss'

const SmallButton = ({ active, children, onClick }) => {
  return (
    <div className={STYLES.smallButton} data-active={!!active} onClick={onClick}>
      {children}
    </div>
  )
}

export default SmallButton
