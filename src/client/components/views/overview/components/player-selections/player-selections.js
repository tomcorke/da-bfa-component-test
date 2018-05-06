import React from 'react'

import STYLES from './player-selections.scss'

const PlayerSelections = ({ children }) => {
  return (
    <div className={STYLES.playerSelections}>{children}</div>
  )
}

export default PlayerSelections
