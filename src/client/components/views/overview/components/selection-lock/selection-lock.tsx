import * as React from 'react'

import * as STYLES from './selection-lock.scss'

interface SelectionLockProps {
  battletag: string
}

const SelectionLock = ({ battletag }: SelectionLockProps) => {
  return <div className={STYLES.selectionLock}>{battletag}</div>
}

export default SelectionLock
