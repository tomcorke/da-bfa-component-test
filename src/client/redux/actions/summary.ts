import { action } from "typesafe-actions";

import { APISummarySelections } from "../../../types/api";
import config from "../../config";
import * as feedbackActions from "../actions/feedback";
import { ApplicationState } from "../reducers";

export const HANDLE_SUMMARY_DATA = "HANDLE_SUMMARY_DATA";
export const GET_SUMMARY_DATA_START = "GET_SUMMARY_DATA_START";
export const GET_SUMMARY_DATA_SUCCESS = "GET_SUMMARY_DATA_SUCCESS";
export const GET_SUMMARY_DATA_FAIL = "GET_SUMMARY_DATA_FAIL";

export const handleSummaryData = (data: APISummarySelections) =>
  action(HANDLE_SUMMARY_DATA, data);

const _getSummaryDataStart = () => action(GET_SUMMARY_DATA_START);
const _getSummaryDataSuccess = () => action(GET_SUMMARY_DATA_SUCCESS);
const _getSummaryDataFail = (error: Error) =>
  action(GET_SUMMARY_DATA_FAIL, error.stack);

interface GetSummaryDataOptions {
  onSuccess?: () => any;
  noFeedback?: boolean;
}

export const getSummaryData = (opts: GetSummaryDataOptions = {}) => {
  return async (dispatch) => {
    const { getSummaryDataEndpoint } = config;

    dispatch(_getSummaryDataStart());
    if (!opts.noFeedback) {
      dispatch(feedbackActions.show("Getting summary data..."));
    }
    try {
      const response = await window.fetch(getSummaryDataEndpoint, {
        credentials: "same-origin",
      });

      if (response.status !== 200) {
        throw Error("Could not get summary view data");
      }

      const data = (await response.json()) as APISummarySelections;

      dispatch(_getSummaryDataSuccess());
      dispatch(handleSummaryData(data));
      if (!opts.noFeedback) {
        dispatch(feedbackActions.hide());
      }
      if (opts.onSuccess) {
        opts.onSuccess();
      }
    } catch (err) {
      dispatch(_getSummaryDataFail(err));
      if (!opts.noFeedback) {
        dispatch(
          feedbackActions.show("Error getting summary data.", "warning")
        );
      }
    }
  };
};

export type SummaryAction = ReturnType<
  | typeof handleSummaryData
  | typeof _getSummaryDataStart
  | typeof _getSummaryDataSuccess
  | typeof _getSummaryDataFail
>;
