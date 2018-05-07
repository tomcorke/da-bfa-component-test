import { connect } from 'react-redux'

import OverviewView from './overview'

const ConnectedOverviewView = connect(
  state => ({
    battletags: state.overview.map(i => i.battletag)
  })
)(OverviewView)

export default ConnectedOverviewView
