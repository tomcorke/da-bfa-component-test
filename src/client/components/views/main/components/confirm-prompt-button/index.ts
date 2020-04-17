import { connect } from "react-redux";

import actions from "../../../../../redux/actions";
import { ApplicationState, Dispatch } from "../../../../../redux/reducers";

import ConfirmPromptButton from "./confirm-prompt-button";

const ConnectedConfirmPromptButton = connect(
  null,
  (dispatch: Dispatch) => ({
    onClick: () => {
      dispatch(actions.userData.promptConfirmSelections());
    }
  })
)(ConfirmPromptButton);

export default ConnectedConfirmPromptButton;
