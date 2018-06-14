import { Reducer } from 'redux'

import * as feedbackActions from '../actions/feedback'

export interface FeedbackState {
  message?: string,
  style?: string,
  fade: boolean,
  hide: boolean
}

const initialState: FeedbackState = {
  fade: false,
  hide: false
}

const FeedbackReducer: Reducer<FeedbackState, feedbackActions.FeedbackAction> = (state = initialState, action) => {
  switch (action.type) {
    case feedbackActions.FEEDBACK_MESSAGE_SHOW:
      return {
        ...state,
        message: action.payload.message,
        style: action.payload.style,
        fade: false,
        hide: false
      }
    case feedbackActions.FEEDBACK_MESSAGE_FADEOUT:
      return {
        ...state,
        fade: true
      }
    case feedbackActions.FEEDBACK_MESSAGE_HIDE:
      return {
        ...state,
        hide: true
      }
    default:
      return state
  }
}

export default FeedbackReducer
