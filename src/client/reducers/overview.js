import * as overviewActions from '../actions/overview'

const initialState = null

const OverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case overviewActions.HANDLE_OVERVIEW_DATA:
      return {
        ...action.data
      }
    default:
      return state
  }
}

export default OverviewReducer
