export const CHANGE_VIEW = 'CHANGE_VIEW'

export const changeView = (view) => {
  return dispatch => {
    setImmediate(() => dispatch({
      type: CHANGE_VIEW,
      view
    }))
  }
}
