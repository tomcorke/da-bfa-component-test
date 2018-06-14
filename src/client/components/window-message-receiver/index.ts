import { connect } from 'react-redux'
import actions from '../../redux/actions'
import { ApplicationState, Dispatch } from '../../redux/reducers'

import WindowMessageReceiver from './window-message-receiver'

const ConnectedWindowMessageReceiver = connect(
  (state: ApplicationState) => ({
    authWindow: state.login.authWindow
  }),
  (dispatch: Dispatch) => ({
    closeAuthWindow: () => dispatch(actions.login.closeAuthWindow()),
    handleUserData: (data) => dispatch(actions.userData.handleUserData(data)),
    getUserData: () => dispatch(actions.userData.getUserData())
  })
)(WindowMessageReceiver)

export default ConnectedWindowMessageReceiver
