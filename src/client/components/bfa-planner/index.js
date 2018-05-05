import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import actions from '../../actions'

import BfaPlanner from './bfa-planner'

const ConnectedBfaPlanner = connect(
  state => ({
    userData: state.userData
  }),
  dispatch => ({
    getUserData: () => dispatch(actions.userData.getUserData())
  })
)(BfaPlanner)

export default hot(module)(ConnectedBfaPlanner)
