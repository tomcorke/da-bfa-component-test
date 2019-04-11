import * as React from 'react'

import config from '../../../../../config'
import ClassIcon from '../../../../class-icon'
import RoleIcon from '../../../../role-icon'
import WarningIndicator from '../warning-indicator'
import { APIPlayerCharacter, LockSelectionChoice, PlayerSelectionChoice } from '../../../../../../types/api'
import { WowRoleTag, WowTag, MAX_CHARACTER_LEVEL } from '../../../../../../types/classes'
import { OverviewPlayerSelection } from '../../../../../redux/reducers/overview'

import * as STYLES from './player-selection.scss'

const ROLES: WowRoleTag[] = ['tank', 'healer', 'dps']
const getRoleTag: (tags: WowTag[]) => WowRoleTag | undefined = (tags) => {
  return ROLES.find(tag => tags && tags.includes(tag)) || undefined
}

const choiceNumbers = {
  first: 1,
  second: 2,
  third: 3
}

export interface PlayerSelectionProps {
  selection?: OverviewPlayerSelection
  choice: PlayerSelectionChoice
  characters: APIPlayerCharacter[]
  profileTimestamp?: number
  onSelect: () => any
  overviewSelection?: LockSelectionChoice
}

const PlayerSelection = (
  {
    selection = {} as OverviewPlayerSelection,
    choice,
    characters,
    profileTimestamp,
    onSelect,
    overviewSelection
  }: PlayerSelectionProps) => {
  const { class: wowClass, spec: wowSpec, comments, tags } = selection

  const choiceNumber = choiceNumbers[choice]

  const cleanComment = comments && comments.trim()
  const hasComment = cleanComment && cleanComment.length > 0

  const realCharacters = characters.filter(char => char.realm)
    .sort((a, b) => (a.level > b.level || (a.level === b.level && a.name < b.name)) ? -1 : 1)
  const classCharacters = realCharacters.filter(char => wowClass && char.class === wowClass.safeName)
  const maxLevelCharacters = classCharacters.filter(char => char.level >= MAX_CHARACTER_LEVEL)
  const realmCharacters = maxLevelCharacters.filter(char => char.realm === config.realm)
  const guildCharacters = realmCharacters.filter(char => char.guild === config.guild)

  const wowClassName = wowClass && wowClass.displayName

  let warningMessage: string | undefined
  let warningSeverity = 0

  const profileTimestampString = `last updated ${
    profileTimestamp
      ? new Date(profileTimestamp).toLocaleString()
      : '(unknown)'
  }`

  if (!wowClass) {
    warningMessage = 'Player has not selected a class'
    warningSeverity = 4
  } else if (classCharacters.length === 0) {
    warningMessage = `Player has no characters of this class

${profileTimestampString}`
    warningSeverity = 3
  } else if (maxLevelCharacters.length === 0) {
    warningMessage = `Player has no characters of this class at max level

Other ${wowClassName} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}

${profileTimestampString}`
    warningSeverity = 3
  } else if (realmCharacters.length === 0) {
    warningMessage = `Player has no max level characters of this class on ${config.realm}

Other ${wowClassName} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}

${profileTimestampString}`
    warningSeverity = 2
  } else if (guildCharacters.length === 0) {
    warningMessage = `Player has no max level characters of this class in the guild

Other ${wowClassName} characters:
${classCharacters.map(char => `  ${char.level} - ${char.name} (${char.realm})`).join('\n')}

${profileTimestampString}`
    warningSeverity = 1
  }

  const specText = (wowSpec && wowSpec.displayName) || '-'

  const selectionClasses = [STYLES.playerSelection]
  let lockIndicator: JSX.Element | null = null

  if (selection.locked) {
    selectionClasses.push(STYLES.playerSelection__locked)
    selectionClasses.push(STYLES[`playerSelection__locked__${selection.lockedChoice || 'none'}`])
    lockIndicator = <div className={STYLES.lockIndicator} />
  }

  if (overviewSelection) {
    selectionClasses.push(STYLES.playerSelection__selected)
    selectionClasses.push(STYLES[`playerSelection__selected__${overviewSelection}`])
  }

  return (
    <div
      className={selectionClasses.join(' ')}
      title={cleanComment}
      onClick={onSelect}
    >
      <div className={STYLES.choiceNumber}>
        {choiceNumber}
      </div>
      <div className={STYLES.class}>
        {wowClass && <ClassIcon wowClass={wowClass.safeName} />}
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
        {lockIndicator}
      </div>
    </div>
  )
}

export default PlayerSelection
