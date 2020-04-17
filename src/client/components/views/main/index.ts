import { connect } from "react-redux";

import { ApplicationState } from "../../../redux/reducers";

import MainView from "./main";

const ConnectedMainView = connect((state: ApplicationState) => ({
  showConfirmSelectionsPrompt: state.userData.showConfirmSelectionsPrompt
}))(MainView);

export default ConnectedMainView;
