import { connect } from 'react-redux'

import MainSection from './main-section'

const ConnectedMainSection = connect(
  (state) => ({
    view: state.view
  }),
  (dispatch) => ({
    onViewMenuClick: (dispatch) => {}
  })
)(MainSection)

export default ConnectedMainSection
