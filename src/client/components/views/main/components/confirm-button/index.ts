import { connect } from 'react-redux'
import actions from '../../../../../redux/actions'
import { ApplicationState, Dispatch } from '../../../../../redux/reducers'

import ConfirmButton from './confirm-button'

const ConnectedConfirmButton = connect(
  null,
  (dispatch: Dispatch) => ({
    onClick: () => {
      dispatch(actions.feedback.show('Confirming selections...'))
      dispatch(actions.userData.hidePromptConfirmSelections())
      dispatch(actions.userData.confirmSelections())
    }
  })
)(ConfirmButton)

export default ConnectedConfirmButton
