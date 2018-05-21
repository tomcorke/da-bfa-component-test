import { combineReducers, Reducer } from 'redux'

import ConfigReducer from './config'
import ViewReducer from './views'
import UserDataReducer from './user-data'
import FeedbackReducer from './feedback'
import LoginReducer from './login'
import OverviewReducer, { OverviewState } from './overview'
import OverviewSelectionsReducer from './overview-selections'
import OverviewSettingsReducer, { OverviewSettingsState } from './overview-settings'

export type ApplicationState = {
  config: any,
  view: any,
  userData: any,
  feedback: any,
  login: any,
  overview: OverviewState,
  overviewSelections: any,
  overviewSettings: any
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  config: ConfigReducer,
  view: ViewReducer,
  userData: UserDataReducer,
  feedback: FeedbackReducer,
  login: LoginReducer,
  overview: OverviewReducer,
  overviewSelections: OverviewSelectionsReducer,
  overviewSettings: OverviewSettingsReducer
})

export default rootReducer
