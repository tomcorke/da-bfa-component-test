import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import actions from '../../actions'

import BfaPlanner from './bfa-planner'

const ConnectedBfaPlanner = connect(
  state => ({
    isGettingUserData: state.userData.isGettingUserData
  }),
  dispatch => ({
    getUserData: bindActionCreators(actions.userData.getUserData, dispatch)
  })
)(BfaPlanner)

export default hot(module)(ConnectedBfaPlanner)
