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
  const {
    user,
    selections = {},
    profile = {
      characters: []
    },
    isAdmin
  } = userData

  const isLoggedIn = !!user
  const hasProfile = !!profile
  const hasCharacters = profile.characters.length > 0
  const hasCharactersInGuild = profile.characters.filter(guildFilter).length > 0

  return {
    ...setGettingData(state, false),
    user,
    selections,
    profile,
    isAdmin,
    hasChanges: false,
    isLoggedIn,
    hasProfile,
    hasCharacters,
    hasCharactersInGuild
  }
}

const handleChangeSelection = (state, name, property, value) => {
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
    case actions.userData.HANDLE_USER_DATA:
      return handleUserData(state, action.data)
    case actions.userData.CHANGE_SELECTION:
      return handleChangeSelection(state, action.name, action.property, action.value)
    default:
      return state
  }
}

export default UserDataReducer
