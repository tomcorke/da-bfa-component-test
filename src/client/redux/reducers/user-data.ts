import { Reducer } from 'redux'

import { APIPlayerData, APIPlayerSelections, APIPlayerProfile, APIPlayer, APIPlayerSelection, APIFlatPlayerSelection } from '../../../types/api'
import config from '../../config'
import actions from '../actions/index'
import { UserDataActions } from '../actions/user-data'

export interface UserSelection {
  class?: string
  spec?: string
  comments?: string
}

export interface UserSelections {
  [choice: string]: UserSelection | undefined
}

export interface UserDataState {
  isGettingUserData?: boolean
  user?: APIPlayer
  selections: UserSelections
  profile?: APIPlayerProfile
  isAdmin: boolean
  isSuperAdmin: boolean
  hasChanges: boolean
  isLoggedIn: boolean
  hasProfile: boolean
  hasCharacters: boolean
  hasCharactersInGuild: boolean
}

const filterByGuild = (guild, realm) => char =>
  char.guild === guild &&
  char.realm === realm

const setGettingData = (state: UserDataState, isGettingData: boolean): UserDataState => {
  return {
    ...state,
    isGettingUserData: isGettingData
  }
}

const flattenPlayerSelection = (apiPlayerSelection: APIPlayerSelection): UserSelection => ({
  class: apiPlayerSelection.class || (apiPlayerSelection.selected && apiPlayerSelection.selected.class) || undefined,
  spec: apiPlayerSelection.spec || (apiPlayerSelection.selected && apiPlayerSelection.selected.spec) || undefined,
  comments: apiPlayerSelection.comments
})

export function flattenUserSelections (apiPlayerSelections?: APIPlayerSelections): UserSelections {
  const flattendedSelections = {} as UserSelections
  if (apiPlayerSelections) {
    Object.keys(apiPlayerSelections).forEach(key => {
      flattendedSelections[key] = flattenPlayerSelection(apiPlayerSelections[key])
    })
  }
  return flattendedSelections
}

const handleUserData = (state: UserDataState, userData: APIPlayerData): UserDataState => {
  const {
    user,
    isAdmin,
    isSuperAdmin
  } = userData

  const selections = flattenUserSelections(userData.selections)

  let { profile } = userData
  profile = profile || {}
  profile.characters = profile.characters || []

  const isLoggedIn = !!user
  const hasProfile = !!profile
  const hasCharacters = profile.characters.length > 0
  const hasCharactersInGuild = profile.characters
    .filter(filterByGuild(config.guild, config.realm))
    .length > 0

  return {
    ...setGettingData(state, false),
    user,
    selections,
    profile,
    isAdmin,
    isSuperAdmin,
    hasChanges: false,
    isLoggedIn,
    hasProfile,
    hasCharacters,
    hasCharactersInGuild
  }
}

function handleChangeSelection (
  state: UserDataState,
  { name, property, value }: { name: string, property: string, value: string }): UserDataState {
  return {
    ...state,
    selections: {
      ...state.selections,
      [name]: {
        ...state.selections[name],
        [property]: value
      }
    }
  }
}

const initialState = {
  selections: {},
  isAdmin: false,
  isSuperAdmin: false,
  hasChanges: false,
  isLoggedIn: false,
  hasProfile: false,
  hasCharacters: false,
  hasCharactersInGuild: false
}

const UserDataReducer: Reducer<UserDataState, UserDataActions> = (state = initialState, action) => {
  switch (action.type) {
    case actions.userData.GET_USER_DATA_START:
      return setGettingData(state, true)
    case actions.userData.GET_USER_DATA_FAIL:
      return setGettingData(state, false)
    case actions.userData.GET_USER_DATA_SUCCESS:
      return setGettingData(state, false)
    case actions.userData.HANDLE_USER_DATA:
      return handleUserData(state, action.payload)
    case actions.userData.CHANGE_SELECTION:
      return handleChangeSelection(state, action.payload)
    default:
      return state
  }
}

export default UserDataReducer
