import React from 'react'

import STYLES from './player-selection.scss'

const PlayerSelection = ({ children }) => {
  return (
    <div className={STYLES.playerSelection}>{children}</div>
  )
}

export default PlayerSelection
