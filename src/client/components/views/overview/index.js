import * as overviewActions from '../../../actions/overview'

import { connect } from 'react-redux'

import OverviewView from './overview'

const ConnectedOverviewView = connect(
  state => ({
    battletags: state.overview.map(i => i.battletag),
    ...state.overviewSettings
  }),
  dispatch => ({
    toggleShowBackupSummary: () => dispatch(overviewActions.toggleShowBackupSummary())
  })
)(OverviewView)

export default ConnectedOverviewView
