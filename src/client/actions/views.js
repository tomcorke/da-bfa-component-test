import * as overviewActions from './overview'

export const SET_VIEW = 'SET_VIEW'

export const setView = (view) => {
  return {
    type: SET_VIEW,
    view
  }
}

export const changeView = (view) => {
  return async dispatch => {
    if (view === 'overview') {
      dispatch(overviewActions.getOverviewData())
        .then(() => dispatch({
          type: SET_VIEW,
          view
        }))
    } else {
      dispatch({
        type: SET_VIEW,
        view
      })
    }
  }
}
