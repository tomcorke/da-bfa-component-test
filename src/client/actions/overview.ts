import { createAction } from './helpers'

export const GET_OVERVIEW_DATA_START = 'GET_OVERVIEW_DATA_START'
export const GET_OVERVIEW_DATA_SUCCESS = 'GET_OVERVIEW_DATA_SUCCESS'
export const GET_OVERVIEW_DATA_FAIL = 'GET_OVERVIEW_DATA_FAIL'
export const HANDLE_OVERVIEW_DATA = 'HANDLE_OVERVIEW_DATA'
export const SHOW_BACKUP_SUMMARY = 'SHOW_BACKUP_SUMMARY'
export const LOAD_OVERVIEW_SETTINGS = 'LOAD_OVERVIEW_SETTINGS'
export const SAVE_OVERVIEW_SETTINGS = 'SAVE_OVERVIEW_SETTINGS'

export const handleOverviewData = (data: object) => ({
  type: HANDLE_OVERVIEW_DATA as typeof HANDLE_OVERVIEW_DATA,
  data
})

const _getOverviewDataStart = () => createAction(GET_OVERVIEW_DATA_START)
const _getOverviewDataSuccess = () => createAction(GET_OVERVIEW_DATA_SUCCESS)
const _getOverviewDataFail = (error) => ({
  ...createAction(GET_OVERVIEW_DATA_FAIL),
  ...{ error: error.stack }
})

export const getOverviewData = (onSuccess) => {
  return async (dispatch, getState) => {
    const { getOverviewViewDataEndpoint } = getState().config

    dispatch(_getOverviewDataStart())
    try {
      const response = await window.fetch(getOverviewViewDataEndpoint, { credentials: 'same-origin' })

      if (response.status !== 200) {
        throw Error('Could not get overview view data')
      }

      const data = await response.json()

      dispatch(_getOverviewDataSuccess())
      dispatch(handleOverviewData(data))
      onSuccess && onSuccess()
    } catch (err) {
      dispatch(_getOverviewDataFail(err))
    }
  }
}

const _loadOverviewSettings = (settings: object) => ({
  ...createAction(LOAD_OVERVIEW_SETTINGS),
  ...{ settings }
})

export const loadOverviewSettings = () => {
  return async (dispatch, getState) => {
    const settings = await getState().overviewSettings
    dispatch(_loadOverviewSettings(settings))
  }
}

const _saveOverviewSettings = (settings: object) => ({
  ...createAction(SAVE_OVERVIEW_SETTINGS),
  ...{ settings }
})

export const saveOverviewSettings = () => {
  return async (dispatch, getState) => {
    const settings = await getState().overviewSettings
    dispatch(_saveOverviewSettings(settings))
  }
}

const _toggleShowBackupSummary = (value: boolean) => ({
  type: SHOW_BACKUP_SUMMARY as typeof SHOW_BACKUP_SUMMARY,
  value
})

export const toggleShowBackupSummary = () => {
  return (dispatch, getState) => {
    const currentValue = getState().overviewSettings.showBackupSummary
    const newValue = !currentValue
    dispatch(_toggleShowBackupSummary(newValue))
    dispatch(saveOverviewSettings())
  }
}

export type OverviewAction = ReturnType<
  | typeof handleOverviewData
  | typeof _getOverviewDataStart
  | typeof _getOverviewDataSuccess
  | typeof _getOverviewDataFail
  | typeof _loadOverviewSettings
  | typeof _saveOverviewSettings
  | typeof _toggleShowBackupSummary>
