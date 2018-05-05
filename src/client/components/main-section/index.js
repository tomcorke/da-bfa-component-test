import { connect } from 'react-redux'

import MainSection from './main-section'

const ConnectedMainSection = connect(
  (state) => ({
    view: state.view,
    isAdmin: state.user && state.user.isAdmin,
    feedback: state.feedback
  }),
  (dispatch) => ({
    onViewMenuClick: (dispatch) => {}
  })
)(MainSection)

export default ConnectedMainSection
