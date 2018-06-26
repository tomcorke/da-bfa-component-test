import * as React from 'react'

import { APIPlayerCharacter } from '../../../../../../types/api'
import config from '../../../../../config'

import * as STYLES from './player-admin-links.scss'

interface PlayerAdminLinksProps {
  isAdmin: boolean
  isSuperAdmin: boolean
  onDeleteClick: () => void
  playerCharacters: APIPlayerCharacter[]
  onChangeDisplayedCharacter: (name: string) => any
}

interface PlayerCharacterSelectProps {
  characters: APIPlayerCharacter[]
  onChange: (name: string) => any
}

const sortCharacters = (a, b) => {
  if (b.realm !== a.realm) {
    if (a.realm === config.realm) return -1
    if (b.realm === config.realm) return 1
    return a.realm < b.realm ? -1 : 1
  }
  if (a.level !== b.level) return b.level - a.level
  return a.name < b.name ? -1 : 1
}

const PlayerCharacterSelect = ({ characters, onChange }: PlayerCharacterSelectProps) => {
  const guildCharacterNames = characters
    .filter(c => c.realm === config.realm && c.guild === config.guild)
    .sort((a, b) => a.name < b.name ? -1 : 1)
    .map(c => c.name)
  const options = guildCharacterNames
    .map(c => <option key={c} value={c}>{c}</option>)
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)
  return (
    <select className={STYLES.playerCharacterSelect} onChange={onSelect}>
      <option key='default' value=''></option>
      {options}
    </select>
  )
}

const PlayerAdminLinks = ({ isAdmin, isSuperAdmin, onDeleteClick, playerCharacters, onChangeDisplayedCharacter }: PlayerAdminLinksProps) => {
  const adminLinks: (() => JSX.Element)[] = [
    () => <PlayerCharacterSelect key='player-character-select' characters={playerCharacters} onChange={onChangeDisplayedCharacter} />
  ]
  const superAdminLinks: (() => JSX.Element)[] = [
    () => <span key='delete' onClick={onDeleteClick} className={STYLES.adminLinkDelete}>delete</span>
  ]

  return (
    <div className={STYLES.playerAdminLinks}>
      {isAdmin && adminLinks.map(link => link())}
      {isSuperAdmin && superAdminLinks.map(link => link())}
    </div>
  )
}

export default PlayerAdminLinks
