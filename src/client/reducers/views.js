import actions from '../actions'

const config = require(`../config/${process.env.NODE_ENV}`).default

const initialState = config.initialView || 'main'

const viewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.views.CHANGE_VIEW:
      return action.view
    default:
      return state
  }
}

export default viewsReducer
