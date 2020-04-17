import { action } from "typesafe-actions";

import {
  APILockSelectionsPayload,
  APIPlayerOverviewSelections,
  APIUnlockSelectionsPayload,
  LockSelectionChoice,
  LOCK_SELECTION_CHOICES,
  PlayerSelectionChoice
} from "../../../types/api";
import config from "../../config";
import * as feedbackActions from "../actions/feedback";
import * as overviewActions from "../actions/overview";
import { ApplicationState } from "../reducers";
import { OverviewPlayerSelection } from "../reducers/overview";
import { SelectedChoice } from "../reducers/overview-selections";

export const SELECT_OVERVIEW_CHOICE = "SELECT_OVERVIEW_CHOICE";
export const DESELECT_OVERVIEW_CHOICE = "DESELECT_OVERVIEW_CHOICE";
export const DESELECT_ALL_PLAYER_OVERVIEW_CHOICES =
  "DESELECT_ALL_PLAYER_OVERVIEW_CHOICES";
export const LOCK_SELECTED_CHOICES_START = "LOCK_SELECTED_CHOICES_START";
export const LOCK_SELECTED_CHOICES_SUCCESS = "LOCK_SELECTED_CHOICES_SUCCESS";
export const LOCK_SELECTED_CHOICES_FAIL = "LOCK_SELECTED_CHOICES_FAIL";
export const UNLOCK_SELECTED_CHOICES_START = "UNLOCK_SELECTED_CHOICES_START";
export const UNLOCK_SELECTED_CHOICES_SUCCESS =
  "UNLOCK_SELECTED_CHOICES_SUCCESS";
export const UNLOCK_SELECTED_CHOICES_FAIL = "UNLOCK_SELECTED_CHOICES_FAIL";
export const AUTO_SELECT_OVERVIEW_CHOICE_ALL =
  "AUTO_SELECT_OVERVIEW_CHOICE_ALL";
export const AUTO_SELECT_OVERVIEW_CHOICE_LOCKED =
  "AUTO_SELECT_OVERVIEW_CHOICE_LOCKED";
export const AUTO_DESELECT_OVERVIEW_CHOICE_ALL =
  "AUTO_DESELECT_OVERVIEW_CHOICE_ALL";

interface UndefinedPlayerSelections {
  selections?: OverviewPlayerSelection[];
}

const _selectOverviewChoice = (selectedChoice: SelectedChoice) =>
  action(SELECT_OVERVIEW_CHOICE, selectedChoice);

const _deselectOverviewChoice = (
  battletag: string,
  selectionChoice: LockSelectionChoice
) =>
  action(DESELECT_OVERVIEW_CHOICE, {
    battletag,
    selectionChoice
  });

export const selectChoice = (
  battletag: string,
  choice: PlayerSelectionChoice
) => {
  return (dispatch, getState: () => ApplicationState) => {
    const { overview, overviewSelections } = getState();
    const { selections: playerSelections = [] } =
      overview.find(o => o.battletag === battletag) ||
      ({} as UndefinedPlayerSelections);
    const playerChoice = playerSelections.find(s => s.choice === choice);

    if (!playerChoice) {
      return;
    }

    const playerOverviewSelections = overviewSelections[battletag] || {};
    const availableSelectionChoice = LOCK_SELECTION_CHOICES.find(
      c => !playerOverviewSelections[c]
    );
    const alreadySelectedChoice = LOCK_SELECTION_CHOICES.find(
      c => playerOverviewSelections[c] === choice
    );

    if (availableSelectionChoice && !alreadySelectedChoice) {
      dispatch(
        _selectOverviewChoice({
          battletag,
          playerChoice: choice,
          selectionChoice: availableSelectionChoice
        })
      );
    } else if (alreadySelectedChoice) {
      dispatch(_deselectOverviewChoice(battletag, alreadySelectedChoice));
    }
  };
};

const _deselectChoicesForPlayer = (battletag: string) =>
  action(DESELECT_ALL_PLAYER_OVERVIEW_CHOICES, battletag);

export const deselectChoicesForPlayer = (battletag: string) => {
  return _deselectChoicesForPlayer(battletag);
};

const lockSelectedChoices = (battletag: string) => {
  return async (dispatch, getState: () => ApplicationState) => {
    const { overviewSelections } = getState();
    const playerOverviewSelections: APIPlayerOverviewSelections =
      overviewSelections[battletag] || {};

    /* Allow not both selections
    if (!LOCK_SELECTION_CHOICES.every(c => !!playerOverviewSelections[c])) {
      // Reject - require both to be selected!
      dispatch(feedbackActions.show(`Main and alt selections required to lock player "${battletag}"`, 'warning'))
      return
    }
    */

    const { adminLockSelectionsEndpoint } = config;

    const payload: APILockSelectionsPayload = {
      battletag,
      playerOverviewSelections
    };

    try {
      const response = await window.fetch(adminLockSelectionsEndpoint, {
        body: JSON.stringify(payload),
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json"
        }
      });

      if (response.status !== 200) {
        throw Error("Could not lock player selection data");
      }

      dispatch(
        feedbackActions.show(
          `Selections for player "${battletag}" locked!`,
          "success"
        )
      );
      dispatch(overviewActions.getOverviewData({ noFeedback: true }));
      dispatch(deselectChoicesForPlayer(battletag));
    } catch (err) {
      dispatch(
        feedbackActions.show(
          `Could not lock selections for player "${battletag}"!`,
          "warning"
        )
      );
    }
  };
};

const unlockSelectedChoices = (battletag: string) => {
  return async (dispatch, getState: () => ApplicationState) => {
    const { overview, userData } = getState();

    const playerData = overview.find(o => o.battletag === battletag);
    if (!playerData || !playerData.locked) {
      return;
    }

    if (playerData.confirmed && !userData.isSuperAdmin) {
      return dispatch(
        feedbackActions.show(
          `Cannot unlock selections for player "${battletag}" - already confirmed.`,
          "warning"
        )
      );
    }

    const { adminUnlockSelectionsEndpoint } = config;

    const payload: APIUnlockSelectionsPayload = { battletag };

    try {
      const response = await window.fetch(adminUnlockSelectionsEndpoint, {
        body: JSON.stringify(payload),
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json"
        }
      });

      if (response.status !== 200) {
        throw Error("Could not unlock player selection data");
      }

      dispatch(
        feedbackActions.show(
          `Selections for player "${battletag}" unlocked!`,
          "success"
        )
      );
      dispatch(overviewActions.getOverviewData({ noFeedback: true }));
      dispatch(deselectChoicesForPlayer(battletag));
    } catch (err) {
      dispatch(
        feedbackActions.show(
          `Could not unlock selections for player "${battletag}"!`,
          "warning"
        )
      );
    }
  };
};

export const toggleLockSelectedChoices = (battletag: string) => {
  return (dispatch, getState: () => ApplicationState) => {
    const playerData = getState().overview.find(o => o.battletag === battletag);
    if (!playerData) {
      return;
    }

    const isLocked = playerData.locked;

    if (isLocked) {
      dispatch(unlockSelectedChoices(battletag));
    } else {
      dispatch(lockSelectedChoices(battletag));
    }
  };
};

const _autoSelectAllOverviewChoices = (battletags: string[]) =>
  action(AUTO_SELECT_OVERVIEW_CHOICE_ALL, battletags);
const _autoSelectLockedOverviewChoices = (
  lockedSelections: {
    battletag: string;
    main: PlayerSelectionChoice;
  }[]
) => action(AUTO_SELECT_OVERVIEW_CHOICE_LOCKED, lockedSelections);
export const autoDeselectAllOverviewChoices = () =>
  action(AUTO_DESELECT_OVERVIEW_CHOICE_ALL);

export const autoSelectAllOverviewChoices = () => {
  return (dispatch, getState: () => ApplicationState) => {
    const battletags = getState().overview.map(o => o.battletag);
    dispatch(_autoSelectAllOverviewChoices(battletags));
  };
};

export const autoSelectLockedOverviewChoices = () => {
  return (dispatch, getState: () => ApplicationState) => {
    const lockedSelections = getState()
      .overview.filter(o => o.locked)
      .map(o => {
        const main = (
          o.selections.find(s => s.lockedChoice === "main") ||
          ({} as OverviewPlayerSelection)
        ).choice;
        return {
          battletag: o.battletag,
          main
        };
      });
    dispatch(_autoSelectLockedOverviewChoices(lockedSelections));
  };
};

export type OverviewSelectionsActions = ReturnType<
  | typeof _selectOverviewChoice
  | typeof _deselectOverviewChoice
  | typeof _deselectChoicesForPlayer
  | typeof _autoSelectAllOverviewChoices
  | typeof _autoSelectLockedOverviewChoices
  | typeof autoDeselectAllOverviewChoices
>;
