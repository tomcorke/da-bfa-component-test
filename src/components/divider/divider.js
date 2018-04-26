import React from 'react'

import STYLES from './divider.scss'

const Divider = ({ type }) => {
  let dividerClass
  switch (type) {
    case 'small':
      dividerClass = STYLES.small
      break
    case 'bottom':
      dividerClass = STYLES.bottom
      break
    case 'large':
    default:
      dividerClass = STYLES.large
  }

  return (
    <div className={`${STYLES.divider} ${dividerClass}`} />
  )
}

export default Divider
