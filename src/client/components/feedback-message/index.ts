import { connect } from 'react-redux'

import actions from '../../redux/actions'
import { ApplicationState } from '../../redux/reducers'

import FeedbackMessage from './feedback-message'

const ConnectedFeedbackMessage = connect(
  (state: ApplicationState) => ({
    ...state.feedback
  }),
  dispatch => ({
    onClick: () => dispatch(actions.feedback.hide())
  })
)(FeedbackMessage)

export default ConnectedFeedbackMessage
