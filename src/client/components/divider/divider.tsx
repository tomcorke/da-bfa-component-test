import * as React from 'react'

import * as STYLES from './divider.scss'

interface DividerProps {
  type?: string
}

const Divider = ({ type }: DividerProps) => {
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
