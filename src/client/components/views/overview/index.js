import { connect } from 'react-redux'

import OverviewView from './overview'

const ConnectedOverviewView = connect(
  state => ({
    overviewData: state.overview
  })
)(OverviewView)

export default ConnectedOverviewView
