import * as React from 'react'

import PlayerIdentifier from '../player-identifier'
import PlayerAdminLinks from '../player-admin-links'
import PlayerSelections from '../player-selections'
import SelectionLock from '../selection-lock'

import * as STYLES from './player-display.scss'

interface PlayerDisplayProps {
  battletag: string
  showLockIn: boolean
  locked: boolean
  toggleLock: () => any
  confirmed: boolean
}

const PlayerDisplay = ({ battletag, showLockIn, locked, toggleLock, confirmed }: PlayerDisplayProps) => {

  let lockInDisplay: JSX.Element | null = null
  if (showLockIn) {
    lockInDisplay = <SelectionLock
    locked={locked}
    toggleLock={toggleLock}
    confirmed={confirmed} />
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
      <div className={STYLES.lock}>
        {lockInDisplay}
      </div>
    </div>
  )
}

export default PlayerDisplay
