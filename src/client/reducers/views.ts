import { Reducer } from 'redux'

import actions from '../actions'
import { ViewActions } from '../actions/views'

const config = require(`../config/${process.env.NODE_ENV}`).default

export type ViewState = string

const initialState = config.initialView || 'intro'

const viewsReducer: Reducer<ViewState, ViewActions> = (state = initialState, action) => {
  switch (action.type) {
    case actions.views.SET_VIEW:
      return action.payload
    default:
      return state
  }
}

export default viewsReducer
