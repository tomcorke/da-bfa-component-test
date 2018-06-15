export interface APIPlayer {
  battletag: string
}

export interface APINestedPlayerSelection {
  selected: {
    class?: string
    spec?: string
  }
  comments?: string
}

export interface APIFlatPlayerSelection {
  class?: string
  spec?: string
  comments?: string
}

export type LockSelectionChoice = 'first' | 'second'

export interface APILockedSelectionData {
  locked: boolean
  lockedChoice?: LockSelectionChoice
}

export type APIPlayerSelection = APINestedPlayerSelection & APIFlatPlayerSelection

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
  isAdmin: boolean
  isSuperAdmin: boolean
  profile?: APIPlayerProfile
}

export interface APIOverviewData {
  userSelectionData: {
    [battletag: string]: APIPlayerSelectionsWithLock
  },
  userProfileData: {
    [battletag: string]: APIPlayerProfile
  }
}

export type PlayerSelectionChoice = 'first' | 'second' | 'third'

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
