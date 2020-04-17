import { Reducer } from "redux";

import { getClass, getSpec } from "../../../data/classes";
import {
  APIOverviewData,
  APIPlayerCharacter,
  APISetDisplayNameResponse,
  LockSelectionChoice,
  PlayerSelectionChoice,
  PLAYER_SELECTION_CHOICES
} from "../../../types/api";
import { WowClass, WowSpecialisation, WowTag } from "../../../types/classes";
import * as overviewActions from "../actions/overview";

import { UserSelection } from "./user-data";

export interface OverviewPlayerSelection {
  choice: PlayerSelectionChoice;
  class?: WowClass;
  spec?: WowSpecialisation;
  tags: WowTag[];
  comments?: string;
  locked: boolean;
  lockedChoice?: LockSelectionChoice;
}

export interface OverviewPlayerData {
  battletag: string;
  characters: APIPlayerCharacter[];
  profileTimestamp?: number;
  selections: OverviewPlayerSelection[];
  locked: boolean;
  confirmed: boolean;
  displayName?: string;
}

export type OverviewState = OverviewPlayerData[];

const initialState: OverviewState = [];

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

const joinOverviewData = (
  state: OverviewState,
  data: APIOverviewData
): OverviewState => {
  const {
    playerSelectionData,
    lockedSelectionData,
    playerProfileData,
    playerDisplayNames
  } = data;

  const newState = Object.entries(playerSelectionData).map(
    ([battletag, selections]) => {
      const profile = playerProfileData[battletag] || {};
      const characters = profile.characters || [];
      const profileTimestamp = profile.timestamp;
      const lockData = lockedSelectionData[battletag] || {};

      const existingPlayerData = state.find(s => s.battletag === battletag);
      return {
        ...existingPlayerData,
        battletag,
        characters,
        profileTimestamp,
        selections: PLAYER_SELECTION_CHOICES.filter(
          choice => selections[choice] && selections[choice].class
        ).map(choice => {
          // Workaround for typescript not recognising filter above validated that value is defined
          let selection = selections[choice];
          selection = selection || ({} as UserSelection);

          const selectedClass = selection.class && getClass(selection.class);
          const selectedSpec =
            selection.class &&
            selection.spec &&
            getSpec(selection.class, selection.spec);

          const classAndSpecTags = Array.from(
            new Set(
              ((selectedClass && selectedClass.tags) || []).concat(
                (selectedSpec && selectedSpec.tags) || []
              )
            )
          );

          return {
            choice,
            class: selectedClass,
            spec: selectedSpec,
            tags: classAndSpecTags,
            comments: selection.comments,
            locked: selection.locked,
            lockedChoice: selection.lockedChoice
          };
        }),
        displayName: playerDisplayNames[battletag],
        ...lockData
      };
    }
  );

  return newState;
};

const handleDisplayNames = (
  state: OverviewState,
  displayNames: APISetDisplayNameResponse
) => {
  const newState = clone(state);
  Object.entries(displayNames).forEach(([battletag, displayName]) => {
    const playerOverview = newState.find(o => o.battletag === battletag);
    if (playerOverview) {
      playerOverview.displayName = displayName;
    }
  });
  return newState;
};

const OverviewReducer: Reducer<
  OverviewState,
  overviewActions.OverviewAction
> = (state = initialState, action) => {
  switch (action.type) {
    case overviewActions.HANDLE_OVERVIEW_DATA:
      return joinOverviewData(state, action.payload);
    case overviewActions.HANDLE_OVERVIEW_DISPLAY_NAMES:
      return handleDisplayNames(state, action.payload);
    default:
      return state;
  }
};

export default OverviewReducer;
