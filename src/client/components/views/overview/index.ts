import * as overviewActions from '../../../redux/actions/overview'

import { connect } from 'react-redux'
import { ApplicationState, Dispatch } from '../../../redux/reducers'

import OverviewView from './overview'

const ConnectedOverviewView = connect(
  (state: ApplicationState) => ({
    battletags: state.overview.map(i => i.battletag),
    showAltSummary: state.overviewSettings.showAltSummary,
    showLockedInSummary: state.overviewSettings.showLockedInSummary
  }),
  (dispatch: Dispatch) => ({
    toggleShowAltSummary: () => dispatch(overviewActions.toggleShowAltSummary),
    toggleShowLockedInSummary: () => dispatch(overviewActions.toggleShowLockedInSummary)
  })
)(OverviewView)

export default ConnectedOverviewView
