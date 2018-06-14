import * as React from 'react'

import config from '../../../../../config'
import ClassIcon from '../../../../class-icon'
import RoleIcon from '../role-icon'
import WarningIndicator from '../warning-indicator'
import { APIPlayerCharacter } from '../../../../../../types/api'
import { OverviewPlayerSelection } from '../../../../../redux/reducers/overview'

import * as STYLES from './player-selection.scss'

const getRoleTag = (tags) => {
  return ['tank', 'healer', 'dps'].find(tag => tags && tags.includes(tag)) || ''
}

const choiceNumbers = {
  first: 1,
  second: 2,
  third: 3
}

export interface PlayerSelectionProps {
  selection?: OverviewPlayerSelection
  choice: string
  characters: APIPlayerCharacter[]
  onSelect: () => void
  overviewSelection: string
}

const PlayerSelection = (
  {
    selection = {} as OverviewPlayerSelection,
    choice,
    characters,
    onSelect,
    overviewSelection
  }: PlayerSelectionProps) => {
  const { classSafeName, spec, comments, tags } = selection

  const choiceNumber = choiceNumbers[choice]

  const cleanComment = comments && comments.trim()
  const hasComment = cleanComment && cleanComment.length > 0

  const realCharacters = characters.filter(char => char.realm)
    .sort((a, b) => (a.level > b.level || (a.level === b.level && a.name < b.name)) ? -1 : 1)
  const classCharacters = realCharacters.filter(char => char.class === classSafeName)
  const maxLevelCharacters = classCharacters.filter(char => char.level === 110)
  const realmCharacters = maxLevelCharacters.filter(char => char.realm === config.realm)
  const guildCharacters = realmCharacters.filter(char => char.guild === config.guild)

  let warningMessage: string | undefined
  let warningSeverity = 0
  if (!classSafeName) {
    warningMessage = 'Player has not selected a class'
    warningSeverity = 4
  } else if (classCharacters.length === 0) {
    warningMessage = 'Player has no characters of this class'
    warningSeverity = 3
  } else if (maxLevelCharacters.length === 0) {
    warningMessage = `Player has no characters of this class at max level

Other ${selection.class} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}`
    warningSeverity = 3
  } else if (realmCharacters.length === 0) {
    warningMessage = `Player has no max level characters of this class on ${config.realm}

Other ${selection.class} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}`
    warningSeverity = 2
  } else if (guildCharacters.length === 0) {
    warningMessage = `Player has no max level characters of this class in the guild

Other ${selection.class} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}`
    warningSeverity = 1
  }

  const specText = (classSafeName && spec) || '-'

  return (
    <div
      className={STYLES.playerSelection}
      title={cleanComment}
      data-selected={!!overviewSelection}
      data-overview-selection={overviewSelection}
      onClick={onSelect}
    >
      <div className={STYLES.choiceNumber}>
        {choiceNumber}
      </div>
      <div className={STYLES.class}>
        {classSafeName && <ClassIcon wowClass={classSafeName} />}
      </div>
      <div className={STYLES.role}>
        <RoleIcon role={getRoleTag(tags)} />
      </div>
      <div className={STYLES.spec}>
        {specText}
      </div>
      <div className={STYLES.indicators}>
        {hasComment && <div className={STYLES.commentIndicator} data-comment={cleanComment} />}
        {warningMessage && <WarningIndicator severity={warningSeverity} message={warningMessage} />}
      </div>
    </div>
  )
}

export default PlayerSelection
