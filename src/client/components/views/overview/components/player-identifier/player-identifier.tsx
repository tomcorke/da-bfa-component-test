import * as React from 'react'

import { getClassName } from '../../../../../../data/classes'
import { APIPlayerCharacter } from '../../../../../../types/api'

import * as STYLES from './player-identifier.scss'

interface PlayerIdentifierProps {
  battletag: string,
  guildCharacters: APIPlayerCharacter[]
}

const PlayerIdentifier = ({ battletag, guildCharacters }: PlayerIdentifierProps) => {

  const characterList = guildCharacters.length > 0
    ? `Guild characters:
${guildCharacters.map(c => `  ${c.level} - ${c.name} - ${getClassName(c.class)}`).join('\n')}`
    : 'No characters in guild'

  return (
    <div className={STYLES.playerIdentifier} title={characterList}>{battletag}</div>
  )
}

export default PlayerIdentifier
