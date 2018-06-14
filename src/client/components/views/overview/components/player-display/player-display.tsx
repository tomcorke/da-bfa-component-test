import * as React from 'react'

import PlayerIdentifier from '../player-identifier'
import PlayerAdminLinks from '../player-admin-links'
import PlayerSelections from '../player-selections'
import SelectionLock from '../selection-lock'

import * as STYLES from './player-display.scss'

interface PlayerDisplayProps {
  battletag: string
  showLockIn: boolean
  lockedIn: boolean
  toggleLock: () => any
}

const PlayerDisplay = ({ battletag, showLockIn, lockedIn, toggleLock }: PlayerDisplayProps) => {

  let lockInDisplay: JSX.Element | null = null
  if (showLockIn) {
    lockInDisplay = <SelectionLock locked={lockedIn} onClick={toggleLock} />
  }

  return (
    <div className={STYLES.playerDisplay}>
      <div className={STYLES.info}>
        <PlayerIdentifier battletag={battletag} />
        <PlayerAdminLinks battletag={battletag} />
      </div>
      <div className={STYLES.selections}>
        <PlayerSelections battletag={battletag} />
      </div>
      {lockInDisplay}
    </div>
  )
}

export default PlayerDisplay
