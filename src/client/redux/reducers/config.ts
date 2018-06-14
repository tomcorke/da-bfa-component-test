import { Reducer } from 'redux'

const config = require('../../config').default

export interface ConfigState {
  guild: string
  realm: string
  region: string
  userDataEndpoint: string
  bnetAuthEndpoint: string
  saveDataEndpoint: string
  getOverviewViewDataEndpoint: string
  adminDeletePlayerDataEndpoint: string
  adminLockSelectionsEndpoint: string
  adminUnlockSelectionsEndpoint: string
}

const initialState: ConfigState = config

const ConfigReducer: Reducer<ConfigState> = (state = initialState) => {
  return state
}

export default ConfigReducer
