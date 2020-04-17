import { action } from "typesafe-actions";

import config from "../../config";
import { ApplicationState, Dispatch } from "../reducers";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const CLOSE_AUTH_WINDOW = "CLOSE_AUTH_WINDOW";

const popupWindow = (url, window, w, h): Window => {
  const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
  const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
  return window.open(
    url,
    "_blank",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, " +
      `scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
  );
};

const _loginStart = (authWindow: Window) => action(LOGIN_START, authWindow);

export const login = (window) => {
  return (dispatch) => {
    const { bnetAuthEndpoint } = config;
    const authWindow = popupWindow(bnetAuthEndpoint, window, 450, 600);

    dispatch(_loginStart(authWindow));
  };
};

const _closeAuthWindow = () => action(CLOSE_AUTH_WINDOW, {});

export const closeAuthWindow = () => {
  return (dispatch: Dispatch, getState: () => ApplicationState) => {
    const { authWindow } = getState().login;
    if (authWindow) {
      authWindow.close();
    }
    dispatch(_closeAuthWindow());
  };
};

export type LoginActions = ReturnType<
  typeof _loginStart | typeof _closeAuthWindow
>;
