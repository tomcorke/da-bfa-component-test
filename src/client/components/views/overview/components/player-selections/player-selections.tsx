import * as React from 'react'

import PlayerSelection from '../player-selection'

import * as STYLES from './player-selections.scss'

const CHOICES = [
  'first',
  'second',
  'third'
]

interface PlayerSelectionsProps {
  battletag: string
}

const PlayerSelections = ({ battletag }: PlayerSelectionsProps) => {
  return (
    <div className={STYLES.playerSelections}>
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
