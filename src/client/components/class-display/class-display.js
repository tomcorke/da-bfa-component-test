import React from 'react'

import WowCharacter from '../wow-character'

import STYLES from './class-display.scss'

const guildFilter = (char) => {
  return (
    char.guild === 'Distinctly Average' &&
    char.realm === 'Silvermoon'
  )
}

const byLevelAndName = (a, b) => {
  if (b.level !== a.level) {
    return b.level - a.level
  }
  return b.name < a.name ? 1 : -1
}

const ClassDisplay = ({ characters }) => {
  const guildCharacters = characters.filter(guildFilter).sort(byLevelAndName)

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
