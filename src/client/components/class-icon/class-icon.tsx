import * as React from 'react'

import * as STYLES from './class-icon.scss'

interface ClassIconProps {
  wowClass: string
}

const ClassIcon = ({ wowClass }: ClassIconProps) => {
  return <div className={STYLES.classIcon} data-class={wowClass} />
}

export default ClassIcon
