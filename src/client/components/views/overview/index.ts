import * as overviewActions from '../../../actions/overview'

import { connect } from 'react-redux'
import { ApplicationState, Dispatch } from '../../../reducers'

import OverviewView from './overview'

const ConnectedOverviewView = connect(
  (state: ApplicationState) => ({
    battletags: state.overview.map(i => i.battletag),
    showBackupSummary: state.overviewSettings.showBackupSummary,
    showSelectionLockIn: state.overviewSettings.showSelectionLockIn
  }),
  (dispatch: Dispatch) => ({
    toggleShowBackupSummary: () => dispatch(overviewActions.toggleShowBackupSummary),
    toggleShowSelectionLockIn: () => dispatch(overviewActions.toggleShowSelectionLockIn)
  })
)(OverviewView)

export default ConnectedOverviewView
