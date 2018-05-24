import * as React from 'react'

import { UserCharacter } from '../../../../../reducers/user-data'
import WowCharacter from '../wow-character'

import * as STYLES from './class-display.scss'

interface ClassDisplayProps {
  guildCharacters: UserCharacter[]
}

const ClassDisplay = ({ guildCharacters }: ClassDisplayProps) => {
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
