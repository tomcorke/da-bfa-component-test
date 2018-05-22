import { connect } from 'react-redux'

import { ApplicationState } from '../../../reducers'

import IntroView from './intro'

const ConnectedIntroView = connect(
  (state: ApplicationState) => ({
    isLoggedIn: state.userData.isLoggedIn,
    hasCharactersInGuild: state.userData.hasCharactersInGuild
  })
)(IntroView)

export default ConnectedIntroView
