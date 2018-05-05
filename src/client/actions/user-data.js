export const GET_USER_DATA_START = 'GET_USER_DATA_START'
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_FAIL = 'GET_USER_DATA_FAIL'

export const getUserData = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_USER_DATA_START
    })

    const { userDataEndpoint } = getState().config

    console.log(getState().config)

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

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const login = () => {
  console.log('login?')
  return {
    type: 'LOGIN_START'
  }
}
