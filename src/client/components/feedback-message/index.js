import { connect } from 'react-redux'
import actions from '../../actions'

import FeedbackMessage from './feedback-message'

const ConnectedFeedbackMessage = connect(
  state => ({
    ...state.feedback
  }),
  dispatch => ({
    onClick: () => dispatch(actions.feedback.hide())
  })
)(FeedbackMessage)

export default ConnectedFeedbackMessage
