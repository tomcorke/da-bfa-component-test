export const GET_OVERVIEW_DATA_START = 'GET_OVERVIEW_DATA_START'
export const GET_OVERVIEW_DATA_SUCCESS = 'GET_OVERVIEW_DATA_SUCCESS'
export const GET_OVERVIEW_DATA_FAIL = 'GET_OVERVIEW_DATA_FAIL'
export const HANDLE_OVERVIEW_DATA = 'HANDLE_OVERVIEW_DATA'
export const SHOW_BACKUP_SUMMARY = 'SHOW_BACKUP_SUMMARY'

export const handleOverviewData = (data) => ({
  type: HANDLE_OVERVIEW_DATA,
  data
})

export const getOverviewData = (onSuccess) => {
  return async (dispatch, getState) => {
    const { getOverviewViewDataEndpoint } = getState().config

    dispatch({ type: GET_OVERVIEW_DATA_START })
    try {
      const response = await window.fetch(getOverviewViewDataEndpoint, { credentials: 'same-origin' })

      if (response.status !== 200) {
        throw Error('Could not get overview view data')
      }

      const data = await response.json()

      dispatch({
        type: GET_OVERVIEW_DATA_SUCCESS
      })
      dispatch(handleOverviewData(data))
      onSuccess && onSuccess()
    } catch (err) {
      dispatch({
        type: GET_OVERVIEW_DATA_FAIL,
        error: err.stack
      })
    }
  }
}

export const toggleShowBackupSummary = () => {
  return (dispatch, getState) => {
    const currentValue = getState().overviewSettings.showBackupSummary
    const newValue = !currentValue
    dispatch({
      type: SHOW_BACKUP_SUMMARY,
      value: newValue
    })
  }
}
