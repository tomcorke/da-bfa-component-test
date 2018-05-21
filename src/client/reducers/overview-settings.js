import * as overviewActions from '../actions/overview'

const initialState = {
  showBackupSummary: false
}

const OverviewSettingsReducer = (state = initialState, action) => {
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
