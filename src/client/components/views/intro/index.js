import { connect } from 'react-redux'
import actions from '../../../actions'

import IntroView from './intro'

const ConnectedIntroView = connect(
  state => ({
    isLoggedIn: state.userData.isLoggedIn,
    hasCharacters: state.userData.hasCharacters,
    hasCharactersInGuild: state.userData.hasCharactersInGuild
  }),
  dispatch => ({
    getUserData: () => dispatch(actions.userData.getUserData()),
    changeToMainView: () => dispatch(actions.views.changeView('main'))
  })
)(IntroView)

export default ConnectedIntroView
