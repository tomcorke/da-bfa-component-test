import { combineReducers } from 'redux'
import ConfigReducer from './config'
import ViewReducer from './views'
import UserDataReducer from './user-data'

const rootReducer = combineReducers({
  config: ConfigReducer,
  view: ViewReducer,
  userData: UserDataReducer
})

export default rootReducer
