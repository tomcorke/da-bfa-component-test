import { connect } from 'react-redux'

import Header from './header'

const ConnectedHeader = connect(
  state => ({
    isLoggedIn: state.userData.isLoggedIn,
    battletag: state.userData.user && state.userData.user.battletag
  })
)(Header)

export default ConnectedHeader
