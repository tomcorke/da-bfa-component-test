import React from 'react'

import STYLES from './class-icon.scss'

const ClassIcon = ({ wowClass }) => {
  return <div className={STYLES.classIcon} data-class={wowClass} />
}

export default ClassIcon
