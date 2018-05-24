import { connect } from 'react-redux'

import { ApplicationState } from '../../reducers'

import MainSection from './main-section'

const ConnectedMainSection = connect(
  (state: ApplicationState) => ({
    view: state.view
  })
)(MainSection)

export default ConnectedMainSection
