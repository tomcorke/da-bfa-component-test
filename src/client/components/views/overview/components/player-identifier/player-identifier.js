import React from 'react'

import { classNames } from '../../../../../data/classes'

import STYLES from './player-identifier.scss'

const PlayerIdentifier = ({ battletag, guildCharacters }) => {
  const characterList = guildCharacters.length > 0
    ? `Guild characters:
${guildCharacters.map(c => `  ${c.level} - ${c.name} - ${classNames[c.class]}`).join('\n')}`
    : 'No characters in guild'
  return (
    <div className={STYLES.playerIdentifier} title={characterList}>{battletag}</div>
  )
}

export default PlayerIdentifier
