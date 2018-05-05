import * as feedbackActions from '../actions/feedback'

const initialState = {}

const FeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case feedbackActions.FEEDBACK_MESSAGE_SHOW:
      return {
        ...state,
        message: action.message,
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
