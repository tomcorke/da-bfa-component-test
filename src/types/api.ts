import { WowClassSafeName, WowSpecSafeName, WowTag } from './classes'
import { AuditLogEntry } from './audit'

export interface APIPlayer {
  battletag: string
}
export interface APIPlayerSelection {
  class?: WowClassSafeName
  spec?: WowSpecSafeName
  comments?: string
}

export type LockSelectionChoice = 'main' | 'alt'
export const LOCK_SELECTION_CHOICES: LockSelectionChoice[] = ['main', 'alt']

export interface APILockedSelectionData {
  locked: boolean
  lockedChoice?: LockSelectionChoice
}

export type APIPlayerSelectionWithLock = APIPlayerSelection & APILockedSelectionData

export interface APIPlayerSelections {
  [choice: string]: APIPlayerSelection
}

export interface APIPlayerSelectionsWithLock {
  [choice: string]: APIPlayerSelectionWithLock
}

export interface APIPlayerCharacter {
  name: string
  class: WowClassSafeName
  realm: string
  guild: string
  level: number
}

export interface APIPlayerProfile {
  characters?: APIPlayerCharacter[]
}

export interface APIPlayerData {
  user: APIPlayer
  selections?: APIPlayerSelectionsWithLock
  lockData: APIPlayerOverviewSelectionsMetaData
  isAdmin: boolean
  isSuperAdmin: boolean
  profile?: APIPlayerProfile
}

export interface APIOverviewData {
  playerSelectionData: {
    [battletag: string]: APIPlayerSelectionsWithLock
  }
  lockedSelectionData: {
    [battletag: string]: APIPlayerOverviewSelectionsMetaData
  }
  playerProfileData: {
    [battletag: string]: APIPlayerProfile | undefined
  },
  playerDisplayNames: {
    [battletag: string]: string | undefined
  }
}

export type PlayerSelectionChoice = 'first' | 'second' | 'third'
export const PLAYER_SELECTION_CHOICES: PlayerSelectionChoice[] = ['first', 'second', 'third']

export interface APIPlayerOverviewSelections {
  [key: string]: PlayerSelectionChoice | undefined
  main?: PlayerSelectionChoice
  alt?: PlayerSelectionChoice
}

export interface APIPlayerOverviewSelectionsMetaData {
  locked: boolean
  confirmed: boolean
}

export type APIPlayerOverviewSelectionsData = { selections: APIPlayerOverviewSelections } & APIPlayerOverviewSelectionsMetaData

export interface APIOverviewSelections {
  [battletag: string]: APIPlayerOverviewSelectionsData
}

// User data

// Data sent from app to client for main view

// Data sent from app to client for overview

// Payloads to send to app to lock and unlock selections for a player

export interface APILockSelectionsPayload {
  battletag: string
  playerOverviewSelections: APIPlayerOverviewSelections
}

export interface APIUnlockSelectionsPayload {
  battletag: string
}

// Data sent from app to client for summary view

export interface APISummarySelection {
  playerName: string
  class: WowClassSafeName
  spec?: WowSpecSafeName
  choice: LockSelectionChoice
  locked: boolean
  confirmed: boolean
  tags: WowTag[]
}

export interface APISummarySelections {
  selections: APISummarySelection[]
}

// Payload sent from client to app to set player display name

export interface APISetDisplayNamePayload {
  battletag: string
  name: string
}

export interface APISetDisplayNameResponse {
  [key: string]: string | undefined
}

export interface APIAuditData {
  entries: AuditLogEntry[]
}
