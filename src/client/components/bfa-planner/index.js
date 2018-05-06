import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import { init } from '../../actions/init'

import BfaPlanner from './bfa-planner'

const ConnectedBfaPlanner = connect(
  null,
  { init }
)(BfaPlanner)

export default hot(module)(ConnectedBfaPlanner)
