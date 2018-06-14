import { action, createAction } from 'typesafe-actions'
import { APIPlayerData } from '../../../types/api'
import { ApplicationState } from '../reducers'

import * as feedbackActions from './feedback'
import * as viewActions from './views'

export const GET_USER_DATA_START = 'GET_USER_DATA_START'
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_FAIL = 'GET_USER_DATA_FAIL'

export const HANDLE_USER_DATA = 'HANDLE_USER_DATA'

export const CHANGE_SELECTION = 'CHANGE_SELECTION'

export const SAVE_SELECTIONS_START = 'SAVE_START'
export const SAVE_SELECTIONS_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_SELECTIONS_FAIL = 'SAVE_FAIL'

interface HandleUserDataOptions {
  onSuccess?: () => any
  noRetry?: boolean
  noSetViewMain?: boolean
}

const _handleUserData = (data: APIPlayerData) => action(HANDLE_USER_DATA, data)

export const handleUserData = (data: APIPlayerData, opts: HandleUserDataOptions = {}) => {
  return (dispatch, getState: () => ApplicationState) => {
    dispatch(_handleUserData(data))

    const { isLoggedIn, hasCharactersInGuild } = getState().userData
    const { view } = getState()

    if (isLoggedIn && view === 'intro') {
      if (hasCharactersInGuild && !opts.noSetViewMain) {
        dispatch(viewActions.setView('main'))
      } else if (!opts.noRetry) {
        dispatch(feedbackActions.show('Getting characters...'))
        dispatch(getUserData({ noRetry: true }))
      }
    }
  }
}

const _getUserDataStart = createAction(GET_USER_DATA_START)
const _getUserDataSuccess = createAction(GET_USER_DATA_SUCCESS)
const _getUserDataFail = (error: Error) => action(GET_USER_DATA_FAIL, error.stack)

export const getUserData = (opts: HandleUserDataOptions = {}) => {
  return async (dispatch, getState) => {
    dispatch(_getUserDataStart())

    const { userDataEndpoint } = getState().config

    try {
      const response = await window.fetch(userDataEndpoint, { credentials: 'same-origin' })

      if (response.status !== 200) {
        throw Error('Could not get user data')
      }

      const data = await response.json()

      dispatch(_getUserDataSuccess())
      dispatch(handleUserData(data, opts))
      opts.onSuccess && opts.onSuccess()
    } catch (err) {
      dispatch(_getUserDataFail(err))
    }
  }
}

export const changeSelection = (name: string, property: string, value: string) => action(
  CHANGE_SELECTION,
  {
    name,
    property,
    value
  }
)

const _saveSelectionsStart = createAction(SAVE_SELECTIONS_START)
const _saveSelectionsSuccess = createAction(SAVE_SELECTIONS_SUCCESS)
const _saveSelectionsFail = (error: Error) => action(SAVE_SELECTIONS_FAIL, error.stack)

export const saveSelections = () => {
  return async (dispatch, getState) => {
    dispatch(_saveSelectionsStart())

    const { saveDataEndpoint } = getState().config
    const { selections } = getState().userData

    try {
      const response = await window.fetch(
        saveDataEndpoint,
        {
          method: 'POST',
          body: JSON.stringify(selections),
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw Error('Could not save selections')
      }

      dispatch(_saveSelectionsSuccess())
      dispatch(feedbackActions.show('Saved!', 'success'))
    } catch (err) {
      dispatch(_saveSelectionsFail(err))
      dispatch(feedbackActions.show('Save failed!', 'warning'))
    }
  }
}

export type UserDataActions = ReturnType<
  | typeof _handleUserData
  | typeof _getUserDataStart
  | typeof _getUserDataSuccess
  | typeof _getUserDataFail
  | typeof changeSelection
  | typeof _saveSelectionsStart
  | typeof _saveSelectionsSuccess
  | typeof _saveSelectionsFail
>
