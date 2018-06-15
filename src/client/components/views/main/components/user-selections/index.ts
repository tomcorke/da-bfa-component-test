import { connect } from 'react-redux'

import { ApplicationState } from '../../../../../redux/reducers'

import UserSelections from './user-selections'

const ConnectedUserSelections = connect(
  (state: ApplicationState) => ({
    ...state.userData.lockData
  })
)(UserSelections)

export default ConnectedUserSelections
