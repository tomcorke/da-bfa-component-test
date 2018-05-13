import * as feedbackActions from './feedback'
import * as overviewActions from './overview'

export const ADMIN_DELETE_PLAYER_DATA_START = 'ADMIN_DELETE_PLAYER_DATA_START'
export const ADMIN_DELETE_PLAYER_DATA_SUCCESS = 'ADMIN_DELETE_PLAYER_DATA_SUCCESS'
export const ADMIN_DELETE_PLAYER_DATA_FAIL = 'ADMIN_DELETE_PLAYER_DATA_FAIL'

export const deletePlayerData = (battletag) => {
  return async (dispatch, getState) => {

    if (!window.confirm(`Are you sure you wish to delete data for ${battletag}? This action cannot be undone!`)) return

    const { adminDeletePlayerDataEndpoint } = getState().config
    dispatch({ type: ADMIN_DELETE_PLAYER_DATA_START, battletag })

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

      dispatch({ type: ADMIN_DELETE_PLAYER_DATA_SUCCESS, battletag })
      dispatch(feedbackActions.show(`Data for player "${battletag}" deleted!`, 'success'))
      dispatch(overviewActions.getOverviewData())
    } catch (err) {
      dispatch({ type: ADMIN_DELETE_PLAYER_DATA_FAIL, battletag, error: err })
      dispatch(feedbackActions.show(`Could not delete data for player "${battletag}"!`, 'warning'))
    }
  }
}
