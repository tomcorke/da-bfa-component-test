import { Reducer } from 'redux'

import { APIUserData, APIUserSelections, APIUserProfile, APIUser } from '../../types/api'
import config from '../config'
import actions from '../actions'
import { UserDataActions } from '../actions/user-data'

export type UserDataState = {
  isGettingUserData?: boolean
  user?: APIUser
  selections: APIUserSelections
  profile?: APIUserProfile
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

const handleUserData = (state: UserDataState, userData: APIUserData): UserDataState => {
  const {
    user,
    selections = {},
    isAdmin,
    isSuperAdmin
  } = userData

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

const handleChangeSelection = (state: UserDataState, { name, property, value }): UserDataState => {
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
