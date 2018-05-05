import { connect } from 'react-redux'
import actions from '../../actions'

import LoginPrompt from './login-prompt'

const ConnectedLoginPrompt = connect(
  state => ({
    isLoggedIn: state.userData.isLoggedIn
  }),
  dispatch => ({
    onLoginClick: () => dispatch(actions.userData.login())
  })
)(LoginPrompt)

export default ConnectedLoginPrompt
