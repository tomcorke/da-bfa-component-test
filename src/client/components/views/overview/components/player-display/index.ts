import { connect } from 'react-redux'
import * as overviewSelectionsActions from '../../../../../redux/actions/overview-selections'
import { ApplicationState, Dispatch } from '../../../../../redux/reducers'

import PlayerDisplay from './player-display'

interface OwnProps {
  battletag: string
}

const ConnectedPlayerDisplay = connect(
  (state: ApplicationState, props: OwnProps) => {
    const playerData = state.overview.find(o => o.battletag === props.battletag)
    return {
      showLockIn: state.overviewSettings.showSelectionLockIn,
      locked: playerData && playerData.locked || false,
      confirmed: playerData && playerData.confirmed || false
    }
  },
  (dispatch: Dispatch, ownProps: OwnProps) => ({
    toggleLock: () => dispatch(overviewSelectionsActions.toggleLockSelectedChoices(ownProps.battletag))
  })
)(PlayerDisplay)

export default ConnectedPlayerDisplay
