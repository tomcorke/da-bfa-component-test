import { combineReducers } from 'redux'
import ConfigReducer from './config'
import ViewReducer from './views'
import UserDataReducer from './user-data'
import FeedbackReducer from './feedback'

const rootReducer = combineReducers({
  config: ConfigReducer,
  view: ViewReducer,
  userData: UserDataReducer,
  feedback: FeedbackReducer
})

export default rootReducer
