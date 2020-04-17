import { connect } from "react-redux";

import {
  APISummarySelection,
  LockSelectionChoice
} from "../../../../types/api";
import { WowClassSafeName } from "../../../../types/classes";
import * as overviewActions from "../../../redux/actions/overview";
import { ApplicationState, Dispatch } from "../../../redux/reducers";
import {
  OverviewPlayerData,
  OverviewPlayerSelection
} from "../../../redux/reducers/overview";

import SummaryView from "./summary";

const summarySelectionFromPlayerSelection = (
  player: OverviewPlayerData,
  playerSelection: OverviewPlayerSelection,
  choice: LockSelectionChoice
): APISummarySelection => ({
  playerName: player.displayName || player.battletag,
  class: (playerSelection.class &&
    playerSelection.class.safeName) as WowClassSafeName,
  spec: playerSelection.spec && playerSelection.spec.safeName,
  choice,
  locked: false,
  confirmed: false,
  tags: playerSelection.tags
});

const ConnectedSummaryView = connect((state: ApplicationState) => {
  return {
    selections: state.summary.summaryData.selections
  };
})(SummaryView);

export default ConnectedSummaryView;
