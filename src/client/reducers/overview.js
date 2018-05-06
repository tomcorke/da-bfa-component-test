import * as overviewActions from '../actions/overview'

const initialState = null

const OverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case overviewActions.GET_OVERVIEW_DATA_SUCCESS:
      return {
        ...action.data
      }
    default:
      return state
  }
}

export default OverviewReducer
