export const GET_OVERVIEW_DATA_START = 'GET_OVERVIEW_DATA_START'
export const GET_OVERVIEW_DATA_SUCCESS = 'GET_OVERVIEW_DATA_SUCCESS'
export const GET_OVERVIEW_DATA_FAIL = 'GET_OVERVIEW_DATA_FAIL'

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
      type: GET_OVERVIEW_DATA_SUCCESS,
      data
    })
  }
}
