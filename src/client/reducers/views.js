import actions from '../actions'

const config = require(`../config/${process.env.NODE_ENV}`).default

const initialState = config.initialView || 'intro'

const viewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.views.SET_VIEW:
      return action.view
    default:
      return state
  }
}

export default viewsReducer
