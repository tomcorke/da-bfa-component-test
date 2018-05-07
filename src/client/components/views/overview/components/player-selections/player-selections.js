import React from 'react'

import PlayerSelection from '../player-selection'

import STYLES from './player-selections.scss'

const CHOICES = [
  'first',
  'second',
  'third'
]

const PlayerSelections = ({ battletag }) => {
  return (
    <div className={STYLES.selections}>
      {CHOICES.map(choice =>
        <PlayerSelection
          key={choice}
          battletag={battletag}
          choice={choice}
        />
      )}
    </div>
  )
}

export default PlayerSelections
