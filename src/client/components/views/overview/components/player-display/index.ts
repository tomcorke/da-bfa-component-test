import { connect } from 'react-redux'
import { ApplicationState } from '../../../../../redux/reducers'

import PlayerDisplay from './player-display'

const ConnectedPlayerDisplay = connect(
  (state: ApplicationState) => ({
    showLockIn: state.overviewSettings.showSelectionLockIn
  })
)(PlayerDisplay)

export default ConnectedPlayerDisplay
