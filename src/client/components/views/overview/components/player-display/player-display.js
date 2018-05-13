import React from 'react'

import PlayerIdentifier from '../player-identifier'
import PlayerAdminLinks from '../player-admin-links'
import PlayerSelections from '../player-selections'

import STYLES from './player-display.scss'

const PlayerDisplay = ({ battletag }) => {
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
