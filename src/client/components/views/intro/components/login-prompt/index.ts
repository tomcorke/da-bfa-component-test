import { connect } from 'react-redux'
import actions from '../../../../../redux/actions'
import { ApplicationState, Dispatch } from '../../../../../redux/reducers'

import LoginPrompt from './login-prompt'

const ConnectedLoginPrompt = connect(
  (state: ApplicationState) => ({
    disableLogin: state.userData.isGettingUserData
  }),
  (dispatch: Dispatch) => ({
    onLoginClick: () => {
      dispatch(actions.login.login(window))
      dispatch(actions.feedback.show('Logging in...'))
    }
  })
)(LoginPrompt)

export default ConnectedLoginPrompt
