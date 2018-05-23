import * as React from 'react'

import PlayerIdentifier from '../player-identifier'
import PlayerAdminLinks from '../player-admin-links'
import PlayerSelections from '../player-selections'

import * as STYLES from './player-display.scss'

interface PlayerDisplayProps {
  battletag: string
}

const PlayerDisplay = ({ battletag }: PlayerDisplayProps) => {
  return (
    <div className={STYLES.playerDisplay}>
      <div className={STYLES.left}>
        <PlayerIdentifier battletag={battletag} />
        <PlayerAdminLinks battletag={battletag} />
      </div>
      <div className={STYLES.right}>
        <PlayerSelections battletag={battletag} />
      </div>
    </div>
  )
}

export default PlayerDisplay
