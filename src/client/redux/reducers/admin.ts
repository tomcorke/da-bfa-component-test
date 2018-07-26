import { Reducer } from 'redux'

import * as adminActions from '../actions/admin'

export interface AdminState {
  assumedIdentity?: string
}

const initialState: AdminState = {
}

const assumePlayerIdentity = (state: AdminState, battletag: string): AdminState => {
  return {
    ...state,
    assumedIdentity: battletag
  }
}

const unassumePlayerIdentity = (state: AdminState): AdminState => {
  return {
    ...state,
    assumedIdentity: undefined
  }
}

const AdminReducer: Reducer<AdminState, adminActions.AdminAction> = (state = initialState, action) => {
  switch (action.type) {
    case adminActions.ADMIN_ASSUME_PLAYER_IDENTITY:
      return assumePlayerIdentity(state, action.payload)
    case adminActions.ADMIN_UNASSUME_PLAYER_IDENTITY:
      return unassumePlayerIdentity(state)
    default:
      return state
  }
}

export default AdminReducer
