import { connect } from "react-redux";

import {
  LOCK_SELECTION_CHOICES,
  PlayerSelectionChoice
} from "../../../../../../types/api";
import actions from "../../../../../redux/actions";
import { ApplicationState, Dispatch } from "../../../../../redux/reducers";
import { OverviewPlayerData } from "../../../../../redux/reducers/overview";

import PlayerSelection from "./player-selection";

interface OwnProps {
  battletag: string;
  choice: PlayerSelectionChoice;
}

const ConnectedPlayerSelection = connect(
  (state: ApplicationState, props: OwnProps) => {
    const playerData =
      state.overview.find(i => i.battletag === props.battletag) ||
      ({} as OverviewPlayerData);
    const selection = playerData.selections.find(
      s => s.choice === props.choice
    );

    const overviewSelections = state.overviewSelections[props.battletag] || {};
    const overviewSelection = LOCK_SELECTION_CHOICES.find(s => {
      const thisOverviewSelection = overviewSelections[s];
      return (
        (thisOverviewSelection &&
          selection &&
          thisOverviewSelection === selection.choice) ||
        false
      );
    });

    return {
      selection,
      overviewSelection,
      characters: playerData.characters,
      profileTimestamp: playerData.profileTimestamp
    };
  },
  (dispatch: Dispatch, props) => ({
    onSelect: () =>
      dispatch(
        actions.overviewSelections.selectChoice(props.battletag, props.choice)
      )
  })
)(PlayerSelection);

export default ConnectedPlayerSelection;
