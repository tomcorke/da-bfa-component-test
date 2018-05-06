import React from 'react'

import WowCharacter from '../wow-character'

import STYLES from './class-display.scss'

const ClassDisplay = ({ guildCharacters }) => {
  return (
    <div className={STYLES.classDisplay}>
      <div className={STYLES.blurb}>Your guild characters:</div>
      <div className={STYLES.characters}>
        {guildCharacters.map(c =>
          <WowCharacter key={`${c.name}-${c.realm}`} character={c} />)}
      </div>
    </div>
  )
}

export default ClassDisplay
