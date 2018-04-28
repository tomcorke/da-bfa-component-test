import React from 'react'

import WowCharacter from '../wow-character'

import STYLES from './class-display.scss'

const guildFilter = (char) => {
  return (
    char.guild === 'Distinctly Average' &&
    char.realm === 'Silvermoon'
  )
}

const ClassDisplay = ({ characters }) => {
  const guildCharacters = characters.filter(guildFilter)

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
