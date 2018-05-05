import actions from '../actions'

const guildFilter = c =>
  c.guild === 'Distinctly Average' &&
  c.realm === 'Silvermoon'

const setGettingData = (state, isGettingData) => {
  return {
    ...state,
    isGettingUserData: isGettingData
  }
}

const handleUserData = (state, userData) => {
  const { user, data, profile, isAdmin } = userData

  const isLoggedIn = !!user
  const hasProfile = !!profile
  const hasCharacters = profile && profile.characters.length > 0
  const hasCharactersInGuild = profile && profile.characters.filter(guildFilter).length > 0

  return {
    ...setGettingData(state, false),
    user,
    userSelectionData: data || {},
    profile,
    isAdmin,
    hasChanges: false,
    isLoggedIn,
    hasProfile,
    hasCharacters,
    hasCharactersInGuild
  }
}

const initialState = {
  isLoggedIn: false
}

const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.userData.GET_USER_DATA_START:
      return setGettingData(state, true)
    case actions.userData.GET_USER_DATA_FAIL:
      return setGettingData(state, false)
    case actions.userData.GET_USER_DATA_SUCCESS:
      return handleUserData(state, action.data)
    default:
      return state
  }
}

export default UserDataReducer
