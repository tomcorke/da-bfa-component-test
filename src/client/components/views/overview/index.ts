import * as overviewActions from '../../../actions/overview'

import { connect } from 'react-redux'
import { ApplicationState, Dispatch } from '../../../reducers'

import OverviewView from './overview'

const ConnectedOverviewView = connect(
  (state: ApplicationState) => ({
    battletags: state.overview.map(i => i.battletag),
    showBackupSummary: state.overviewSettings.showBackupSummary
  }),
  (dispatch: Dispatch) => ({
    toggleShowBackupSummary: () => dispatch(overviewActions.toggleShowBackupSummary)
  })
)(OverviewView)

export default ConnectedOverviewView
