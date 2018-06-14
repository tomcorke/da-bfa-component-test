import { connect } from 'react-redux'
import * as overviewSelectionsActions from '../../../../../redux/actions/overview-selections'
import { ApplicationState, Dispatch } from '../../../../../redux/reducers'

import PlayerDisplay from './player-display'

interface OwnProps {
  battletag: string
}

const ConnectedPlayerDisplay = connect(
  (state: ApplicationState) => ({
    showLockIn: state.overviewSettings.showSelectionLockIn,
    lockedIn: false
  }),
  (dispatch: Dispatch, ownProps: OwnProps) => ({
    toggleLock: () => dispatch(overviewSelectionsActions.toggleLockSelectedChoices(ownProps.battletag))
  })
)(PlayerDisplay)

export default ConnectedPlayerDisplay
