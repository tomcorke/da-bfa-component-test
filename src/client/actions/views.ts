import { action, createAction } from 'typesafe-actions'

import * as userDataActions from './user-data'
import * as overviewActions from './overview'

export const SET_VIEW = 'SET_VIEW'

export const setView = (view: string) => action(SET_VIEW, view)

export const changeView = (view) => {
  return async dispatch => {
    const setViewAction = () => dispatch(setView(view))
    if (view === 'main') {
      dispatch(userDataActions.getUserData(setViewAction))
    } else if (view === 'overview') {
      dispatch(overviewActions.getOverviewData(setViewAction))
    } else {
      setViewAction()
    }
  }
}

export type ViewActions = ReturnType<
  | typeof setView
>
