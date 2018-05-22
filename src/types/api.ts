export type APIUser = {
  battletag: string
}

export type APIUserSelection = {
  selected?: {
    class?: string
    spec?: string
  }
  comments?: string
}

export type APIUserSelections = {
  [choice: string]: APIUserSelection
}

export type APIUserCharacter = {
  name: string
}

export type APIUserProfile = {
  characters?: APIUserCharacter[]
}

export type APIUserData = {
  user: APIUser
  selections: APIUserSelections
  isAdmin: boolean
  isSuperAdmin: boolean
  profile?: APIUserProfile
}

export type APIOverviewData = {
  userSelectionData: {
    [battletag: string]: APIUserSelections
  },
  userProfileData: {
    [battletag: string]: APIUserProfile
  }
}
