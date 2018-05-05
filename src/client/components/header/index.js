import { connect } from 'react-redux'

import Header from './header'

const ConnectedHeader = connect(
  state => ({
    userData: state.userData
  })
)(Header)

export default ConnectedHeader
