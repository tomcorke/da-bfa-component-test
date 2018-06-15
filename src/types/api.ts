export interface APIPlayer {
  battletag: string
}
export interface APIPlayerSelection {
  class?: string
  spec?: string
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
  class: string
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
  userSelectionData: {
    [battletag: string]: APIPlayerSelectionsWithLock
  }
  lockedSelectionData: {
    [battletag: string]: APIPlayerOverviewSelectionsMetaData
  }
  userProfileData: {
    [battletag: string]: APIPlayerProfile | undefined
  }
}

export type PlayerSelectionChoice = 'first' | 'second' | 'third'
export const PLAYER_SELECTION_CHOICES: PlayerSelectionChoice[] = ['first', 'second', 'third']

export interface APIPlayerOverviewSelections {
  [key: string]: PlayerSelectionChoice | undefined
  first?: PlayerSelectionChoice
  second?: PlayerSelectionChoice
}

export interface APIPlayerOverviewSelectionsMetaData {
  locked: boolean
  confirmed: boolean
}

export type APIPlayerOverviewSelectionsData = { selections: APIPlayerOverviewSelections } & APIPlayerOverviewSelectionsMetaData

export interface APIOverviewSelections {
  [battletag: string]: APIPlayerOverviewSelectionsData
}

export interface APILockSelectionsPayload {
  battletag: string
  playerOverviewSelections: APIPlayerOverviewSelections
}

export interface APIUnlockSelectionsPayload {
  battletag: string
}
