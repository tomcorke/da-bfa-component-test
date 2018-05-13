import * as userDataActions from './user-data'
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
    const setViewAction = () => dispatch({
      type: SET_VIEW,
      view
    })
    if (view === 'main') {
      dispatch(userDataActions.getUserData(setViewAction))
    } else if (view === 'overview') {
      dispatch(overviewActions.getOverviewData(setViewAction))
    } else {
      setViewAction()
    }
  }
}
