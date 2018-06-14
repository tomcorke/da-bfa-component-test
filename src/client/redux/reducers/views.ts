import { Reducer } from 'redux'

import actions from '../actions/index'
import { ViewActions } from '../actions/views'

const config = require(`../../config/${process.env.NODE_ENV}`).default

export type View = 'intro' | 'main' | 'overview' | 'export'
export const VIEWS = ['intro', 'main', 'overview', 'export']
export type ViewState = View

const initialState: ViewState = config.initialView || 'intro'

const handleSetView = (view: View): ViewState => {
  window.location.hash = view
  return view
}

const viewsReducer: Reducer<ViewState, ViewActions> = (state = initialState, action) => {
  switch (action.type) {
    case actions.views.SET_VIEW:
      return handleSetView(action.payload)
    default:
      return state
  }
}

export default viewsReducer
