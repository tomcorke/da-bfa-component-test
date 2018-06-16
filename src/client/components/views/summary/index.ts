import { connect } from 'react-redux'

import SummaryView from './summary'
import { ApplicationState } from '../../../redux/reducers'

const ConnectedSummaryView = connect(
  (state: ApplicationState) => ({
    ...state.summary.summaryData
  })
)(SummaryView)

export default ConnectedSummaryView
