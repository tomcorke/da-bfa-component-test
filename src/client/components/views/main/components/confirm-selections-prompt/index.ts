import { connect } from 'react-redux'
import actions from '../../../../../redux/actions'
import { ApplicationState, Dispatch } from '../../../../../redux/reducers'

import ConfirmSelectionsPrompt from './confirm-selections-prompt'

const ConnectedConfirmSelectionsPrompt = connect(
  null,
  (dispatch) => ({
    hide: () => dispatch(actions.userData.hidePromptConfirmSelections())
  })
)(ConfirmSelectionsPrompt)

export default ConnectedConfirmSelectionsPrompt
