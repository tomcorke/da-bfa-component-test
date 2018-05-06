import actions from '.'

export const INIT_START = 'INIT_START'

export const init = () => {
  return (dispatch, getState) => {
    dispatch({ type: INIT_START })

    // Load mock data and/or trigger getUserData

    const { mockUserData, mockOverviewData, forceView } = getState().config

    if (mockUserData) {
      dispatch(actions.userData.handleUserData(mockUserData))
    } else {
      dispatch(actions.userData.getUserData())
    }

    if (mockOverviewData) {
      dispatch(actions.overview.handleOverviewData(mockOverviewData))
    }

    if (forceView) {
      dispatch(actions.views.setView(forceView))
    }
  }
}
