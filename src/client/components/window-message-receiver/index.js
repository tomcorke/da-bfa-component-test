import { connect } from 'react-redux'
import actions from '../../actions'

import WindowMessageReceiver from './window-message-receiver'

const ConnectedWindowMessageReceiver = connect(
  state => ({
    authWindow: state.login.authWindow
  }),
  dispatch => ({
    closeAuthWindow: () => dispatch(actions.login.closeAuthWindow()),
    handleUserData: (data) => dispatch(actions.userData.handleUserData(data)),
    getUserData: () => dispatch(actions.userData.getUserData())
  })
)(WindowMessageReceiver)

export default ConnectedWindowMessageReceiver
