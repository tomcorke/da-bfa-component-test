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

export const handleUserData = (data, opts = {}) => {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_USER_DATA,
      data
    })

    const { isLoggedIn, hasCharactersInGuild } = getState().userData
    const { view } = getState()

    if (isLoggedIn && view === 'intro') {
      if (hasCharactersInGuild) {
        dispatch(viewActions.setView('main'))
      } else if (!opts.noRetry) {
        dispatch(feedbackActions.show('Getting characters...'))
        dispatch(getUserData(null, { noRetry: true }))
      }
    }
  }
}

export const getUserData = (onSuccess, opts = {}) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USER_DATA_START
    })

    const { userDataEndpoint } = getState().config

    try {
      const response = await window.fetch(userDataEndpoint, { credentials: 'same-origin' })

      if (response.status !== 200) {
        throw Error('Could not get user data')
      }

      const data = await response.json()

      dispatch({
        type: GET_USER_DATA_SUCCESS
      })
      dispatch(handleUserData(data, opts))
      onSuccess && onSuccess()
    } catch (err) {
      dispatch({
        type: GET_USER_DATA_FAIL,
        error: err
      })
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
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_START
    })

    const { saveDataEndpoint } = getState().config
    const { selections } = getState().userData

    try {
      const response = await window.fetch(
        saveDataEndpoint,
        {
          method: 'POST',
          body: JSON.stringify(selections),
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw Error('Could not save selections')
      }

      dispatch({
        type: SAVE_SUCCESS
      })
      dispatch(feedbackActions.show('Saved!', 'success'))
    } catch (err) {
      dispatch({
        type: SAVE_FAIL,
        error: err
      })
      dispatch(feedbackActions.show('Save failed!', 'warning'))
    }
  }
}
