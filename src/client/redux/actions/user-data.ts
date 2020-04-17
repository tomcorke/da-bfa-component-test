import { action } from "typesafe-actions";

import { APIPlayerData } from "../../../types/api";
import config from "../../config";
import { ApplicationState } from "../reducers";

import * as feedbackActions from "./feedback";
import * as viewActions from "./views";

export const GET_USER_DATA_START = "GET_USER_DATA_START";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAIL = "GET_USER_DATA_FAIL";

export const HANDLE_USER_DATA = "HANDLE_USER_DATA";

export const CHANGE_SELECTION = "CHANGE_SELECTION";

export const SAVE_SELECTIONS_START = "SAVE_START";
export const SAVE_SELECTIONS_SUCCESS = "SAVE_SUCCESS";
export const SAVE_SELECTIONS_FAIL = "SAVE_FAIL";

export const CONFIRM_SELECTIONS_PROMPT_SHOW = "CONFIRM_SELECTIONS_PROMPT_SHOW";
export const CONFIRM_SELECTIONS_PROMPT_HIDE = "CONFIRM_SELECTIONS_PROMPT_HIDE";

export const CONFIRM_SELECTIONS_START = "CONFIRM_SELECTIONS_START";
export const CONFIRM_SELECTIONS_SUCCESS = "CONFIRM_SELECTIONS_SUCCESS";
export const CONFIRM_SELECTIONS_FAIL = "CONFIRM_SELECTIONS_FAIL";

interface HandleUserDataOptions {
  onSuccess?: () => any;
  noRetry?: boolean;
  noSetViewMain?: boolean;
}

const _handleUserData = (data: APIPlayerData) => action(HANDLE_USER_DATA, data);

export const handleUserData = (
  data: APIPlayerData,
  opts: HandleUserDataOptions = {}
) => {
  return (dispatch, getState: () => ApplicationState) => {
    dispatch(_handleUserData(data));

    const { isLoggedIn, hasCharactersInGuild } = getState().userData;
    const { view } = getState();

    if (isLoggedIn && view === "intro") {
      if (hasCharactersInGuild && !opts.noSetViewMain) {
        dispatch(viewActions.setView("main"));
      } else if (!opts.noRetry) {
        dispatch(feedbackActions.show("Getting characters..."));
        dispatch(getUserData({ noRetry: true }));
      }
    }
  };
};

const _getUserDataStart = () => action(GET_USER_DATA_START);
const _getUserDataSuccess = () => action(GET_USER_DATA_SUCCESS);
const _getUserDataFail = (error: Error) =>
  action(GET_USER_DATA_FAIL, error.stack);

export const getUserData = (opts: HandleUserDataOptions = {}) => {
  return async (dispatch, getState: () => ApplicationState) => {
    dispatch(_getUserDataStart());

    const { userDataEndpoint } = config;
    const assumedIdentity = getState().admin.assumedIdentity;
    const url = assumedIdentity
      ? `${userDataEndpoint}?battletag=${encodeURIComponent(assumedIdentity)}`
      : userDataEndpoint;

    try {
      const response = await window.fetch(url, { credentials: "same-origin" });

      if (response.status !== 200) {
        throw Error("Could not get user data");
      }

      const data = await response.json();

      dispatch(_getUserDataSuccess());
      dispatch(handleUserData(data, opts));
      if (opts.onSuccess) {
        opts.onSuccess();
      }
    } catch (err) {
      dispatch(_getUserDataFail(err));
    }
  };
};

export const changeSelection = (
  name: string,
  property: string,
  value: string
) =>
  action(CHANGE_SELECTION, {
    name,
    property,
    value,
  });

const _saveSelectionsStart = () => action(SAVE_SELECTIONS_START);
const _saveSelectionsSuccess = () => action(SAVE_SELECTIONS_SUCCESS);
const _saveSelectionsFail = (error: Error) =>
  action(SAVE_SELECTIONS_FAIL, error.stack);

export const saveSelections = () => {
  return async (dispatch, getState: () => ApplicationState) => {
    dispatch(_saveSelectionsStart());

    const { saveDataEndpoint } = config;
    const { selections } = getState().userData;
    const assumedIdentity = getState().admin.assumedIdentity;
    const url = assumedIdentity
      ? `${saveDataEndpoint}?battletag=${encodeURIComponent(assumedIdentity)}`
      : saveDataEndpoint;

    try {
      const response = await window.fetch(url, {
        method: "POST",
        body: JSON.stringify(selections),
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw Error("Could not save selections");
      }

      dispatch(_saveSelectionsSuccess());
      dispatch(feedbackActions.show("Saved!", "success"));
    } catch (err) {
      dispatch(_saveSelectionsFail(err));
      dispatch(feedbackActions.show("Save failed!", "warning"));
    }
  };
};

const _confirmSelectionsPromptShow = () =>
  action(CONFIRM_SELECTIONS_PROMPT_SHOW);
const _confirmSelectionsPromptHide = () =>
  action(CONFIRM_SELECTIONS_PROMPT_HIDE);
const _confirmSelectionsStart = () => action(CONFIRM_SELECTIONS_START);
const _confirmSelectionsSuccess = () => action(CONFIRM_SELECTIONS_SUCCESS);
const _confirmSelectionsFail = (error: Error) =>
  action(CONFIRM_SELECTIONS_FAIL, error.stack);

export const promptConfirmSelections = () => {
  return _confirmSelectionsPromptShow();
};

export const hidePromptConfirmSelections = () => {
  return _confirmSelectionsPromptHide();
};

export const confirmSelections = () => {
  return async (dispatch, getState: () => ApplicationState) => {
    dispatch(_confirmSelectionsStart());

    const { confirmSelectionsEndpoint } = config;
    const assumedIdentity = getState().admin.assumedIdentity;
    const url = assumedIdentity
      ? `${confirmSelectionsEndpoint}?battletag=${encodeURIComponent(
          assumedIdentity
        )}`
      : confirmSelectionsEndpoint;

    try {
      const response = await window.fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw Error("Could not confirm selections");
      }

      dispatch(_confirmSelectionsSuccess());
      dispatch(feedbackActions.show("Confirmed!", "success"));
      dispatch(getUserData());
    } catch (err) {
      dispatch(_confirmSelectionsFail(err));
      dispatch(feedbackActions.show("Confirm failed!", "warning"));
    }
  };
};

export type UserDataActions = ReturnType<
  | typeof _handleUserData
  | typeof _getUserDataStart
  | typeof _getUserDataSuccess
  | typeof _getUserDataFail
  | typeof changeSelection
  | typeof _saveSelectionsStart
  | typeof _saveSelectionsSuccess
  | typeof _saveSelectionsFail
  | typeof _confirmSelectionsPromptShow
  | typeof _confirmSelectionsPromptHide
  | typeof _confirmSelectionsStart
  | typeof _confirmSelectionsSuccess
  | typeof _confirmSelectionsFail
>;
