import { connect } from 'react-redux'
import actions from '../../../../../redux/actions'
import { ApplicationState, Dispatch } from '../../../../../redux/reducers'

import SaveButton from './save-button'

const ConnectedSaveButton = connect(
  (state: ApplicationState) => ({
    highlight: state.userData.hasChanges
  }),
  (dispatch: Dispatch) => ({
    onClick: () => {
      dispatch(actions.feedback.show('Saving...'))
      dispatch(actions.userData.saveSelections())
    }
  })
)(SaveButton)

export default ConnectedSaveButton
