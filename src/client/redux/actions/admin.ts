import { action } from 'typesafe-actions'

import * as feedbackActions from './feedback'
import * as overviewActions from './overview'

export const ADMIN_DELETE_PLAYER_DATA_START = 'ADMIN_DELETE_PLAYER_DATA_START'
export const ADMIN_DELETE_PLAYER_DATA_SUCCESS = 'ADMIN_DELETE_PLAYER_DATA_SUCCESS'
export const ADMIN_DELETE_PLAYER_DATA_FAIL = 'ADMIN_DELETE_PLAYER_DATA_FAIL'

const _deleteStart = (battletag: string) => action(ADMIN_DELETE_PLAYER_DATA_START, { battletag })
const _deleteSuccess = (battletag: string) => action(ADMIN_DELETE_PLAYER_DATA_SUCCESS, { battletag })
const _deleteFail = (battletag: string, error: Error) => action(ADMIN_DELETE_PLAYER_DATA_FAIL, { battletag, error: error.stack })

export const deletePlayerData = (battletag) => {
  return async (dispatch, getState) => {
    if (!window.confirm(`Are you sure you wish to delete data for ${battletag}? This action cannot be undone!`)) return

    const { adminDeletePlayerDataEndpoint } = getState().config
    dispatch(_deleteStart(battletag))

    try {
      const response = await window.fetch(
        adminDeletePlayerDataEndpoint,
        {
          body: JSON.stringify({ battletag }),
          method: 'DELETE',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw Error('Could not delete player data')
      }

      dispatch(_deleteSuccess(battletag))
      dispatch(feedbackActions.show(`Data for player "${battletag}" deleted!`, 'success'))
      dispatch(overviewActions.getOverviewData())
    } catch (err) {
      dispatch(_deleteFail(battletag, err))
      dispatch(feedbackActions.show(`Could not delete data for player "${battletag}"!`, 'warning'))
    }
  }
}

export type AdminAction = ReturnType<
  | typeof _deleteStart
  | typeof _deleteSuccess
  | typeof _deleteFail
>
