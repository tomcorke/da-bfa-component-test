import { connect } from "react-redux";

import * as overviewSelectionActions from "../../../../../redux/actions/overview-selections";
import { Dispatch } from "../../../../../redux/reducers";

import HandyLinks from "./handy-links";

const ConnectedHandyLinks = connect(
  null,
  (dispatch: Dispatch) => ({
    onSelectAllClick: () =>
      dispatch(overviewSelectionActions.autoSelectAllOverviewChoices()),
    onSelectLockedClick: () =>
      dispatch(overviewSelectionActions.autoSelectLockedOverviewChoices()),
    onDeselectAllClick: () =>
      dispatch(overviewSelectionActions.autoDeselectAllOverviewChoices())
  })
)(HandyLinks);

export default ConnectedHandyLinks;
