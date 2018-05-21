import * as overviewActions from '../actions/overview'

export type OverviewSettingsState = {
  showBackupSummary: boolean
}

const initialState: OverviewSettingsState = {
  showBackupSummary: false
}

const OverviewSettingsReducer = (
  state: OverviewSettingsState = initialState,
  action: overviewActions.OverviewAction): OverviewSettingsState => {
  switch (action.type) {
    case overviewActions.SHOW_BACKUP_SUMMARY:
      return {
        ...state,
        showBackupSummary: action.value
      }
    default:
      return state
  }
}

export default OverviewSettingsReducer
