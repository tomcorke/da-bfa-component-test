import { connect } from 'react-redux'
import actions from '../../../../../actions'

import SaveButton from './save-button'

const ConnectedSaveButton = connect(
  state => ({
    highlight: state.userData.hasChanges
  }),
  dispatch => ({
    onClick: () => {
      dispatch(actions.feedback.show('Saving...'))
      dispatch(actions.userData.saveSelections())
    }
  })
)(SaveButton)

export default ConnectedSaveButton
