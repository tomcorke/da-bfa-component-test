import * as feedbackActions from './feedback'
import * as viewActions from './views'

export const GET_USER_DATA_START = 'GET_USER_DATA_START'
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_FAIL = 'GET_USER_DATA_FAIL'

export const HANDLE_USER_DATA = 'HANDLE_USER_DATA'

export const CHANGE_SELECTION = 'CHANGE_SELECTION'

export const SAVE_START = 'SAVE_START'
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_FAIL = 'SAVE_FAIL'

export const getUserData = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USER_DATA_START
    })

    const { userDataEndpoint } = getState().config

    try {
      const response = await window.fetch(userDataEndpoint, { credentials: 'include' })

      if (response.status !== 200) {
        throw Error('Could not get user data')
      }

      const data = await response.json()

      dispatch({
        type: GET_USER_DATA_SUCCESS
      })
      dispatch(handleUserData(data, { preventGetUserData: true }))
    } catch (err) {
      dispatch({
        type: GET_USER_DATA_FAIL,
        error: err
      })
    }
  }
}

export const handleUserData = (data, opts = {}) => {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_USER_DATA,
      data
    })

    const { isLoggedIn, hasCharacters, hasCharactersInGuild } = getState().userData
    const { view } = getState()

    if (isLoggedIn) {
      if (!hasCharacters && !opts.preventGetUserData) {
        dispatch(getUserData())
      } else if (view === 'intro' && hasCharactersInGuild) {
        dispatch(viewActions.changeView('main'))
      }
    }
  }
}

export const changeSelection = (name, property, value) => {
  return ({
    type: CHANGE_SELECTION,
    name,
    property,
    value
  })
}

export const saveSelections = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_START
    })

    const { saveDataEndpoint } = getState().config
    const { selections } = getState().userData

    const xhr = new window.XMLHttpRequest()
    xhr.open('POST', saveDataEndpoint, true)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          dispatch({
            type: SAVE_SUCCESS
          })
          dispatch(feedbackActions.show('Saved!', 'success'))
        } else {
          dispatch({
            type: SAVE_FAIL
          })
          dispatch(feedbackActions.show('Save failed!', 'warning'))
        }
      }
    }
    xhr.send(JSON.stringify(selections))
  }
}
