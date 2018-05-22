import { Reducer } from 'redux'

const config = require(`../config/${process.env.NODE_ENV}`).default

export type ConfigState = {
  guild: string,
  realm: string,
  region: string,
  userDataEndpoint: string,
  bnetAuthEndpoint: string,
  saveDataEndpoint: string,
  getOverviewViewDataEndpoint: string,
  adminDeletePlayerDataEndpoint: string
}

const initialState: ConfigState = config

const ConfigReducer: Reducer<ConfigState> = (state = initialState) => {
  return state
}

export default ConfigReducer
