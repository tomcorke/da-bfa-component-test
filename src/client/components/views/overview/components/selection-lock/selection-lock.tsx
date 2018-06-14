import * as React from 'react'

import * as STYLES from './selection-lock.scss'

interface CheckActionProps {
  checked: boolean
  uncheckedText: string
  checkedText: string
  onClick: () => any
}

const CheckAction = ({ checked, uncheckedText, checkedText, onClick }: CheckActionProps) => {
  return (
    <label className={STYLES.checkAction}>
      <input type='checkbox' checked={checked} onClick={onClick} />
      <div className={STYLES.checkDisplay} />
      {checked ? checkedText : uncheckedText}
    </label>
  )
}

interface SelectionLockProps {
  locked: boolean
  onClick: () => any
}

const SelectionLock = ({ locked, onClick }: SelectionLockProps) => {
  return (
    <div className={STYLES.selectionLock}>
      <CheckAction checked={locked} uncheckedText='Not locked' checkedText='Locked' onClick={onClick} />
    </div>
  )
}

export default SelectionLock
