import { connect } from 'react-redux'
import actions from '../../actions'

import FeedbackMessage from './feedback-message'

const ConnectedFeedbackMessage = connect(
  state => ({
    message: state.feedback.message,
    fade: state.feedback.fade,
    hide: state.feedback.hide
  }),
  dispatch => ({
    onClick: () => dispatch(actions.feedback.hide())
  })
)(FeedbackMessage)

export default ConnectedFeedbackMessage
