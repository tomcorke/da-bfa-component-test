import React from 'react'

import STYLES from './player-display.scss'

const PlayerDisplay = ({ children }) => {
  return (
    <div className={STYLES.playerDisplay}>{children}</div>
  )
}

export default PlayerDisplay
