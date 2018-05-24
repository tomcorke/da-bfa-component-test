export type APIPlayer = {
  battletag: string
}

export type APINestedPlayerSelection = {
  selected: {
    class?: string
    spec?: string
  }
  comments?: string
}

export type APIFlatPlayerSelection = {
  class?: string
  spec?: string
  comments?: string
}

export type APIPlayerSelection = APINestedPlayerSelection & APIFlatPlayerSelection

export type APIPlayerSelections = {
  [choice: string]: APIPlayerSelection
}

export type APIPlayerCharacter = {
  name: string
  class: string
  realm: string
  guild: string
  level: number
}

export type APIPlayerProfile = {
  characters?: APIPlayerCharacter[]
}

export type APIPlayerData = {
  user: APIPlayer
  selections?: APIPlayerSelections
  isAdmin: boolean
  isSuperAdmin: boolean
  profile?: APIPlayerProfile
}

export type APIOverviewData = {
  userSelectionData: {
    [battletag: string]: APIPlayerSelections
  },
  userProfileData: {
    [battletag: string]: APIPlayerProfile
  }
}
