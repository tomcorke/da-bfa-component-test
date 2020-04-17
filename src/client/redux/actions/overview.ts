import { action, createAction } from "typesafe-actions";

import {
  APIOverviewData,
  APISetDisplayNamePayload,
  APISetDisplayNameResponse
} from "../../../types/api";
import config from "../../config";
import * as feedbackActions from "../actions/feedback";
import { ApplicationState } from "../reducers";

export const GET_OVERVIEW_DATA_START = "GET_OVERVIEW_DATA_START";
export const GET_OVERVIEW_DATA_SUCCESS = "GET_OVERVIEW_DATA_SUCCESS";
export const GET_OVERVIEW_DATA_FAIL = "GET_OVERVIEW_DATA_FAIL";
export const HANDLE_OVERVIEW_DATA = "HANDLE_OVERVIEW_DATA";

export const SHOW_ALT_SUMMARY = "SHOW_BACKUP_SUMMARY";
export const SHOW_LOCKED_IN_SUMMARY = "SHOW_LOCKED_IN_SUMMARY";

export const LOAD_OVERVIEW_SETTINGS = "LOAD_OVERVIEW_SETTINGS";
export const SAVE_OVERVIEW_SETTINGS = "SAVE_OVERVIEW_SETTINGS";

export const HANDLE_OVERVIEW_DISPLAY_NAMES = "SET_OVERVIEW_DISPLAYED_NAME";

export const handleOverviewData = (data: APIOverviewData) =>
  action(HANDLE_OVERVIEW_DATA, data);

const _getOverviewDataStart = createAction(GET_OVERVIEW_DATA_START);
const _getOverviewDataSuccess = createAction(GET_OVERVIEW_DATA_SUCCESS);
const _getOverviewDataFail = (error: Error) =>
  action(GET_OVERVIEW_DATA_FAIL, error.stack);

interface GetOverviewDataOptions {
  onSuccess?: () => any;
  noFeedback?: boolean;
}

export const getOverviewData = (opts: GetOverviewDataOptions = {}) => {
  return async dispatch => {
    const { getOverviewViewDataEndpoint } = config;

    dispatch(_getOverviewDataStart());
    if (!opts.noFeedback) {
      dispatch(feedbackActions.show("Getting overview data..."));
    }
    try {
      const response = await window.fetch(getOverviewViewDataEndpoint, {
        credentials: "same-origin"
      });

      if (response.status !== 200) {
        throw Error("Could not get overview view data");
      }

      const data = (await response.json()) as APIOverviewData;

      dispatch(_getOverviewDataSuccess());
      if (!opts.noFeedback) {
        dispatch(feedbackActions.hide());
      }
      dispatch(handleOverviewData(data));
      if (opts.onSuccess) {
        opts.onSuccess();
      }
    } catch (err) {
      dispatch(_getOverviewDataFail(err));
      if (!opts.noFeedback) {
        dispatch(
          feedbackActions.show("Error getting overview data.", "warning")
        );
      }
    }
  };
};

const _loadOverviewSettings = (settings: object) =>
  action(LOAD_OVERVIEW_SETTINGS, settings);

export const loadOverviewSettings = () => {
  return async (dispatch, getState: () => ApplicationState) => {
    const settings = await getState().overviewSettings;
    dispatch(_loadOverviewSettings(settings));
  };
};

const _saveOverviewSettings = (settings: object) =>
  action(SAVE_OVERVIEW_SETTINGS, settings);

export const saveOverviewSettings = () => {
  return async (dispatch, getState: () => ApplicationState) => {
    const settings = await getState().overviewSettings;
    dispatch(_saveOverviewSettings(settings));
  };
};

const _toggleShowAltSummary = (value: boolean) =>
  action(SHOW_ALT_SUMMARY, value);

export const toggleShowAltSummary = (
  dispatch,
  getState: () => ApplicationState
) => {
  const currentValue = getState().overviewSettings.showAltSummary;
  const newValue = !currentValue;
  dispatch(_toggleShowAltSummary(newValue));
  dispatch(saveOverviewSettings());
};

const _toggleShowLockedInSummary = (value: boolean) =>
  action(SHOW_LOCKED_IN_SUMMARY, value);

export const toggleShowLockedInSummary = (
  dispatch,
  getState: () => ApplicationState
) => {
  const currentValue = getState().overviewSettings.showLockedInSummary;
  const newValue = !currentValue;
  dispatch(_toggleShowLockedInSummary(newValue));
  dispatch(saveOverviewSettings());
};

const _handleOverviewDisplayNames = (displayNames: APISetDisplayNameResponse) =>
  action(HANDLE_OVERVIEW_DISPLAY_NAMES, displayNames);

export const setOverviewDisplayedName = (battletag: string, name: string) => {
  return async dispatch => {
    const { setDisplayNameEndpoint } = config;
    try {
      const payload: APISetDisplayNamePayload = { battletag, name };
      const response = await window.fetch(setDisplayNameEndpoint, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json"
        },
        credentials: "same-origin"
      });
      if (response.status === 200) {
        const responseData = (await response.json()) as APISetDisplayNameResponse;
        dispatch(_handleOverviewDisplayNames(responseData));
      }
    } catch (e) {
      /* This is fine */
    }
  };
};

export type OverviewAction = ReturnType<
  | typeof handleOverviewData
  | typeof _getOverviewDataStart
  | typeof _getOverviewDataSuccess
  | typeof _getOverviewDataFail
  | typeof _loadOverviewSettings
  | typeof _saveOverviewSettings
  | typeof _toggleShowAltSummary
  | typeof _toggleShowLockedInSummary
  | typeof _handleOverviewDisplayNames
>;
