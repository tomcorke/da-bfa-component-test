import { connect } from 'react-redux'

import IntroView from './intro'

const ConnectedIntroView = connect(
  state => ({
    isLoggedIn: state.userData.isLoggedIn,
    hasCharactersInGuild: state.userData.hasCharactersInGuild
  })
)(IntroView)

export default ConnectedIntroView
