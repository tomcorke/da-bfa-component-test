import * as overviewActions from "../actions/overview";

export interface OverviewSettingsState {
  showAltSummary: boolean;
  showLockedInSummary: boolean;
}

const initialState: OverviewSettingsState = {
  showAltSummary: false,
  showLockedInSummary: false
};

const OverviewSettingsReducer = (
  state: OverviewSettingsState = initialState,
  action: overviewActions.OverviewAction
): OverviewSettingsState => {
  switch (action.type) {
    case overviewActions.SHOW_ALT_SUMMARY:
      return {
        ...state,
        showAltSummary: action.payload
      };
    case overviewActions.SHOW_LOCKED_IN_SUMMARY:
      return {
        ...state,
        showLockedInSummary: action.payload
      };
    default:
      return state;
  }
};

export default OverviewSettingsReducer;
