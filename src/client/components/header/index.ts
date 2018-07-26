import { connect } from 'react-redux'

import { ApplicationState } from '../../redux/reducers'

import Header from './header'

const ConnectedHeader = connect(
  (state: ApplicationState) => ({
    isLoggedIn: state.userData.isLoggedIn,
    isSuperAdmin: state.userData.isSuperAdmin,
    battletag: state.userData.user && state.userData.user.battletag
  })
)(Header)

export default ConnectedHeader
