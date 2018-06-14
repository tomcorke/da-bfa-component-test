import { createAction, action } from 'typesafe-actions'
import { APIOverviewData } from '../../../types/api'
import * as feedbackActions from '../actions/feedback'

export const GET_OVERVIEW_DATA_START = 'GET_OVERVIEW_DATA_START'
export const GET_OVERVIEW_DATA_SUCCESS = 'GET_OVERVIEW_DATA_SUCCESS'
export const GET_OVERVIEW_DATA_FAIL = 'GET_OVERVIEW_DATA_FAIL'
export const HANDLE_OVERVIEW_DATA = 'HANDLE_OVERVIEW_DATA'
export const SHOW_BACKUP_SUMMARY = 'SHOW_BACKUP_SUMMARY'
export const SHOW_SELECTION_LOCK_IN = 'SHOW_SELECTION_LOCK_IN'
export const LOAD_OVERVIEW_SETTINGS = 'LOAD_OVERVIEW_SETTINGS'
export const SAVE_OVERVIEW_SETTINGS = 'SAVE_OVERVIEW_SETTINGS'

export const handleOverviewData = (data: APIOverviewData) => action(
  HANDLE_OVERVIEW_DATA,
  data
)

const _getOverviewDataStart = createAction(GET_OVERVIEW_DATA_START)
const _getOverviewDataSuccess = createAction(GET_OVERVIEW_DATA_SUCCESS)
const _getOverviewDataFail = (error: Error) => action(
  GET_OVERVIEW_DATA_FAIL,
  error.stack
)

export const getOverviewData = (onSuccess?: () => void) => {
  return async (dispatch, getState) => {
    const { getOverviewViewDataEndpoint } = getState().config

    dispatch(_getOverviewDataStart())
    dispatch(feedbackActions.show('Getting overview data...'))
    try {
      const response = await window.fetch(getOverviewViewDataEndpoint, { credentials: 'same-origin' })

      if (response.status !== 200) {
        throw Error('Could not get overview view data')
      }

      const data = await response.json() as APIOverviewData

      dispatch(_getOverviewDataSuccess())
      dispatch(feedbackActions.hide())
      dispatch(handleOverviewData(data))
      onSuccess && onSuccess()
    } catch (err) {
      dispatch(_getOverviewDataFail(err))
      dispatch(feedbackActions.show('Error getting overview data.', 'warning'))
    }
  }
}

const _loadOverviewSettings = (settings: object) => action(
  LOAD_OVERVIEW_SETTINGS,
  settings
)

export const loadOverviewSettings = () => {
  return async (dispatch, getState) => {
    const settings = await getState().overviewSettings
    dispatch(_loadOverviewSettings(settings))
  }
}

const _saveOverviewSettings = (settings: object) => action(
  SAVE_OVERVIEW_SETTINGS,
  settings
)

export const saveOverviewSettings = () => {
  return async (dispatch, getState) => {
    const settings = await getState().overviewSettings
    dispatch(_saveOverviewSettings(settings))
  }
}

const _toggleShowBackupSummary = (value: boolean) => action(
  SHOW_BACKUP_SUMMARY,
  value
)

export const toggleShowBackupSummary =
  (dispatch, getState) => {
    const currentValue = getState().overviewSettings.showBackupSummary
    const newValue = !currentValue
    dispatch(_toggleShowBackupSummary(newValue))
    dispatch(saveOverviewSettings())
  }

const _toggleShowSelectionLockIn = (value: boolean) => action(
  SHOW_SELECTION_LOCK_IN,
  value
)

export const toggleShowSelectionLockIn =
  (dispatch, getState) => {
    const currentValue = getState().overviewSettings.showSelectionLockIn
    const newValue = !currentValue
    dispatch(_toggleShowSelectionLockIn(newValue))
    dispatch(saveOverviewSettings())
  }

export type OverviewAction = ReturnType<
  | typeof handleOverviewData
  | typeof _getOverviewDataStart
  | typeof _getOverviewDataSuccess
  | typeof _getOverviewDataFail
  | typeof _loadOverviewSettings
  | typeof _saveOverviewSettings
  | typeof _toggleShowBackupSummary
  | typeof _toggleShowSelectionLockIn>
