import { connect } from "react-redux";

import {
  LockSelectionChoice,
  LOCK_SELECTION_CHOICES
} from "../../../../../../types/api";
import { WowClass, WowTag } from "../../../../../../types/classes";
import { ApplicationState } from "../../../../../redux/reducers";
import { OverviewPlayerSelection } from "../../../../../redux/reducers/overview";
import { OverviewSelections } from "../../../../../redux/reducers/overview-selections";

import SummaryBox from "./summary-box";

interface OverviewSelectionData {
  overviewSelection?: LockSelectionChoice;
}

type OverviewPlayerSelectionWithOverviewSelection = OverviewPlayerSelection &
  OverviewSelectionData;

const joinWithOverviewSelections = (
  playerOverviewSelections: OverviewSelections = {} as OverviewSelections
) => (
  selection: OverviewPlayerSelection
): OverviewPlayerSelectionWithOverviewSelection => {
  const overviewSelection = LOCK_SELECTION_CHOICES.find((key: string) => {
    const os = playerOverviewSelections[key];
    return (os && selection && selection.choice === os) || false;
  });

  return {
    ...selection,
    overviewSelection
  };
};

interface SelectionsSummaryData {
  tags: WowTag[];
  class?: WowClass;
}

type SelectionFilter = (
  selection: OverviewPlayerSelectionWithOverviewSelection
) => boolean;
interface OwnProps {
  selectionFilter?: SelectionFilter;
}

const ConnectedSummaryBox = connect(
  (state: ApplicationState, props: OwnProps) => {
    const noUndefinedFilter: SelectionFilter = selection => !!selection.class;
    const selectionFilter: SelectionFilter =
      props.selectionFilter || (() => true);
    return {
      allSelections: state.overview.reduce(
        (allSelections: SelectionsSummaryData[], player) =>
          allSelections.concat(
            player.selections
              .map(
                joinWithOverviewSelections(
                  state.overviewSelections[player.battletag]
                )
              )
              .filter(noUndefinedFilter)
              .filter(selectionFilter)
              .map(selection => ({
                tags: selection.tags,
                class: selection.class
              }))
          ),
        []
      )
    };
  }
)(SummaryBox);

export default ConnectedSummaryBox;
