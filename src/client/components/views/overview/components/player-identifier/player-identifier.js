import React from 'react'

import STYLES from './player-identifier.scss'

const PlayerIdentifier = ({ children }) => {
  return (
    <div className={STYLES.playerIdentifier}>{children}</div>
  )
}

export default PlayerIdentifier
