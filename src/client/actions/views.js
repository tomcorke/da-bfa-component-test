import * as overviewActions from './overview'

export const CHANGE_VIEW = 'CHANGE_VIEW'

export const changeView = (view) => {
  return async dispatch => {
    if (view === 'overview') {
      dispatch(overviewActions.getOverviewData())
        .then(() => dispatch({
          type: CHANGE_VIEW,
          view
        }))
    } else {
      dispatch({
        type: CHANGE_VIEW,
        view
      })
    }
  }
}
