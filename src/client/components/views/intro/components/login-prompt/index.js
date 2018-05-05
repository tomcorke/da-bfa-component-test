import { connect } from 'react-redux'
import actions from '../../../../../actions'

import LoginPrompt from './login-prompt'

const ConnectedLoginPrompt = connect(
  state => ({
    disableLogin: state.userData.isGettingUserData
  }),
  dispatch => ({
    onLoginClick: () => {
      dispatch(actions.userData.login())
      dispatch(actions.feedback.show('Logging in...'))
    }
  })
)(LoginPrompt)

export default ConnectedLoginPrompt
