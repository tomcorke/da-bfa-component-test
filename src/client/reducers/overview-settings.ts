import * as overviewActions from '../actions/overview'

export type OverviewSettingsState = {
  showBackupSummary: boolean
  showSelectionLockIn: boolean
}

const initialState: OverviewSettingsState = {
  showBackupSummary: false,
  showSelectionLockIn: false
}

const OverviewSettingsReducer = (
  state: OverviewSettingsState = initialState,
  action: overviewActions.OverviewAction): OverviewSettingsState => {
  switch (action.type) {
    case overviewActions.SHOW_BACKUP_SUMMARY:
      return {
        ...state,
        showBackupSummary: action.payload
      }
    case overviewActions.SHOW_SELECTION_LOCK_IN:
      return {
        ...state,
        showSelectionLockIn: action.payload
      }
    default:
      return state
  }
}

export default OverviewSettingsReducer
