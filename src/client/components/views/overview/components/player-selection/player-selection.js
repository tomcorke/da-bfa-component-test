import React from 'react'

import config from '../../../../../config'
import ClassIcon from '../../../../class-icon'
import RoleIcon from '../role-icon'
import WarningIndicator from '../warning-indicator'

import STYLES from './player-selection.scss'

const getRoleTag = (tags) => {
  return ['tank', 'healer', 'dps'].find(tag => tags && tags.includes(tag))
}

const choiceNumbers = {
  first: 1,
  second: 2,
  third: 3
}

const PlayerSelection = ({ selection, characters, onSelect }) => {
  if (!selection) return null

  const { choice, classSafeName, spec, comments, tags, selected } = selection

  const choiceNumber = choiceNumbers[choice]

  const cleanComment = comments && comments.trim()
  const hasComment = cleanComment && cleanComment.length > 0

  const realCharacters = characters.filter(char => char.realm)
    .sort((a, b) => (a.level > b.level || (a.level === b.level && a.name < b.name)) ? -1 : 1)
  const classCharacters = realCharacters.filter(char => char.class === selection.classSafeName)
  const maxLevelCharacters = classCharacters.filter(char => char.level === 110)
  const realmCharacters = maxLevelCharacters.filter(char => char.realm === config.realm)
  const guildCharacters = realmCharacters.filter(char => char.guild === config.guild)

  let warningMessage = null
  let warningSeverity = 0
  if (classCharacters.length === 0) {
    warningMessage = 'Player has no characters of this class'
    warningSeverity = 3
  } else if (maxLevelCharacters.length === 0) {
    warningMessage = `Player has no characters of this class at max level

Other ${choice.class} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}`
    warningSeverity = 3
  } else if (realmCharacters.length === 0) {
    warningMessage = `Player has no max level characters of this class on ${config.realm}

Other ${choice.class} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}`
    warningSeverity = 2
  } else if (guildCharacters.length === 0) {
    warningMessage = `Player has no max level characters of this class in the guild

Other ${choice.class} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}`
    warningSeverity = 1
  }

  return (
    <div
      className={STYLES.playerSelection}
      title={cleanComment}
      data-selected={selected}
      onClick={onSelect}
    >
      <div className={STYLES.choiceNumber}>
        {choiceNumber}
      </div>
      <div className={STYLES.class}>
        <ClassIcon wowClass={classSafeName} />
      </div>
      <div className={STYLES.role}>
        <RoleIcon role={getRoleTag(tags)} />
      </div>
      <div className={STYLES.spec}>
        {spec}
      </div>
      <div className={STYLES.indicators}>
        {hasComment && <div className={STYLES.commentIndicator} data-comment={cleanComment} />}
        {warningMessage && <WarningIndicator severity={warningSeverity} message={warningMessage} />}
      </div>
    </div>
  )
}

export default PlayerSelection
