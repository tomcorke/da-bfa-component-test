import * as React from 'react'

import * as STYLES from './selection-lock.scss'

interface LockedStatusProps {
  locked: boolean
  onClick: () => any
}

const LockedStatus = ({ locked, onClick }: LockedStatusProps) => {
  return (
    <label className={STYLES.lockedStatus}>
      <input type='checkbox' checked={locked} onClick={onClick} />
      <div className={STYLES.lockedStatusIcon} />
      {locked ? 'Locked' : 'Not locked'}
    </label>
  )
}

interface ConfirmedStatusProps {
  confirmed: boolean
}

const ConfirmedStatus = ({ confirmed }: ConfirmedStatusProps) => {
  const confirmedClasses = [STYLES.confirmedStatus]
  if (confirmed) confirmedClasses.push(STYLES.confirmedStatus__confirmed)
  return (
    <div className={confirmedClasses.join(' ')}>
      <div className={STYLES.confirmedStatusIcon} />
      {confirmed ? 'Confirmed' : 'Not confirmed'}
    </div>
  )
}

interface SelectionLockProps {
  locked: boolean
  toggleLock: () => any
  confirmed: boolean
}

const SelectionLock = ({ locked, toggleLock, confirmed }: SelectionLockProps) => {
  return (
    <div className={STYLES.selectionLock}>
      <LockedStatus locked={locked} onClick={toggleLock} />
      {locked ? <ConfirmedStatus confirmed={confirmed} /> : null }
    </div>
  )
}

export default SelectionLock
