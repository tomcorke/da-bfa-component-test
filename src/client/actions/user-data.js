import * as feedbackActions from './feedback'

export const GET_USER_DATA_START = 'GET_USER_DATA_START'
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_FAIL = 'GET_USER_DATA_FAIL'

export const HANDLE_USER_DATA = 'HANDLE_USER_DATA'

export const CHANGE_SELECTION = 'CHANGE_SELECTION'

export const SAVE_START = 'SAVE_START'
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_FAIL = 'SAVE_FAIL'

export const getUserData = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_USER_DATA_START
    })

    const { userDataEndpoint } = getState().config

    window.fetch(userDataEndpoint, { credentials: 'include' })
      .then(response => {
        if (response.status !== 200) {
          throw Error('Could not get user data')
        }
        return response.json()
      })
      .then(data => {
        setImmediate(() => dispatch({
          type: GET_USER_DATA_SUCCESS,
          data
        }))
      })
      .catch(err => {
        dispatch({
          type: GET_USER_DATA_FAIL,
          error: err && err.message
        })
      })
  }
}

export const handleUserData = (data) => {
  return ({
    type: HANDLE_USER_DATA,
    data
  })
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
      if (xhr.readyState === 4 && xhr.status === 200) {
        dispatch({
          type: SAVE_SUCCESS
        })
        dispatch(feedbackActions.show('Saved!'))
      }
    }
    xhr.send(JSON.stringify(selections))
  }
}
