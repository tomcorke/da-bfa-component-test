import * as loginActions from '../actions/login'

const initialState = {}

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginActions.LOGIN_START:
      return {
        ...state,
        authWindow: action.authWindow
      }
    case loginActions.CLOSE_AUTH_WINDOW:
      return {
        ...state,
        authWindow: null
      }
    default:
      return state
  }
}

export default LoginReducer
