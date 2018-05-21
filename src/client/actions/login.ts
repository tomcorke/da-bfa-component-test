export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const CLOSE_AUTH_WINDOW = 'CLOSE_AUTH_WINDOW'

const popupWindow = (url, window, w, h) => {
  const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2)
  const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2)
  return window.open(url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, ' +
    `scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`)
}

export const login = (window) => {
  return (dispatch, getState) => {
    const { bnetAuthEndpoint } = getState().config
    const authWindow = popupWindow(bnetAuthEndpoint, window, 450, 600)

    dispatch({
      type: LOGIN_START,
      authWindow
    })
  }
}

export const closeAuthWindow = () => {
  return (dispatch, getState) => {
    const { authWindow } = getState().login
    if (authWindow) {
      authWindow.close()
    }
    dispatch({
      type: CLOSE_AUTH_WINDOW
    })
  }
}
