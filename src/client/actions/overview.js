export const GET_OVERVIEW_DATA_START = 'GET_OVERVIEW_DATA_START'
export const GET_OVERVIEW_DATA_SUCCESS = 'GET_OVERVIEW_DATA_SUCCESS'
export const GET_OVERVIEW_DATA_FAIL = 'GET_OVERVIEW_DATA_FAIL'
export const HANDLE_OVERVIEW_DATA = 'HANDLE_OVERVIEW_DATA'
export const SELECT_OVERVIEW_CHOICE = 'SELECT_OVERVIEW_CHOICE'

export const handleOverviewData = (data) => {
  return {
    type: HANDLE_OVERVIEW_DATA,
    data
  }
}

export const getOverviewData = () => {
  return async (dispatch, getState) => {
    const { getOverviewViewDataEndpoint } = getState().config

    dispatch({ type: GET_OVERVIEW_DATA_START })
    const response = await window.fetch(getOverviewViewDataEndpoint, { credentials: 'include' })

    if (response.status !== 200) {
      dispatch({ type: GET_OVERVIEW_DATA_FAIL })
      throw Error('Could not get overview view data')
    }

    const data = await response.json()

    dispatch({
      type: GET_OVERVIEW_DATA_SUCCESS
    })
    dispatch(handleOverviewData(data))
  }
}

export const selectChoice = (battletag, choice) => {
  return {
    type: SELECT_OVERVIEW_CHOICE,
    battletag,
    choice
  }
}
