import { createAction } from 'typesafe-actions'

import actions from '.'
import { VIEWS, View } from '../reducers/views'

export const INIT_START = 'INIT_START'

const _initStart = createAction(INIT_START)

const isView = (view: string): view is View => {
  return Object.values(VIEWS).includes(view)
}
const isMain = (view: View) => {
  return view === 'main'
}

export const init = () => {
  return (dispatch, getState) => {
    dispatch(_initStart())

    // Load mock data and/or trigger getUserData

    const { mockUserData, mockOverviewData, initialView } = getState().config

    if (mockUserData) {
      dispatch(actions.userData.handleUserData(mockUserData))
    } else {
      const hashView = window.location.hash && window.location.hash.substr(1)
      const useHashView = isView(hashView) && !isMain(hashView)
      dispatch(actions.userData.getUserData(() => {
        useHashView && dispatch(actions.views.changeView(hashView as View))
      }, {
        noSetViewMain: useHashView
      }))
    }

    if (mockOverviewData) {
      dispatch(actions.overview.handleOverviewData(mockOverviewData))
    }

    if (initialView && isView(initialView)) {
      dispatch(actions.views.setView(initialView))
    }
  }
}

export type InitAction = ReturnType<
  | typeof _initStart
>
