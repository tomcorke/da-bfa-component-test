import { Reducer } from 'redux'

import { APISummarySelections } from '../../../types/api'
import * as summaryActions from '../actions/summary'

export interface SummaryState {
  summaryData: APISummarySelections
}

const initialState: SummaryState = {
  summaryData: { selections: [] } as APISummarySelections
}

const SummaryReducer: Reducer<SummaryState, summaryActions.SummaryAction> = (state = initialState, action) => {
  switch (action.type) {
    case summaryActions.HANDLE_SUMMARY_DATA:
      return {
        ...state,
        summaryData: action.payload
      }
    default:
      return state
  }
}

export default SummaryReducer
