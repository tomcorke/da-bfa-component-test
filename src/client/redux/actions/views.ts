import { action } from 'typesafe-actions'

import { View } from '../reducers/views'

import * as userDataActions from './user-data'
import * as overviewActions from './overview'

export const SET_VIEW = 'SET_VIEW'

export const setView = (view: View) => action(SET_VIEW, view)

export const changeView = (view: View) => {
  return async dispatch => {
    const setViewAction = () => dispatch(setView(view))
    if (view === 'main') {
      dispatch(userDataActions.getUserData({ onSuccess: setViewAction }))
    } else if (view === 'overview') {
      dispatch(overviewActions.getOverviewData({ onSuccess: setViewAction }))
    } else {
      setViewAction()
    }
  }
}

export type ViewActions = ReturnType<
  | typeof setView
>
