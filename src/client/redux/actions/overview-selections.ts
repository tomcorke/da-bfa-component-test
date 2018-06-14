import { action } from 'typesafe-actions'

import { OverviewPlayerSelection } from '../reducers/overview'
import { OVERVIEW_SELECTION_CHOICES, SelectedChoice, OverviewSelectionChoice } from '../reducers/overview-selections'
import { ApplicationState } from '../reducers'
import * as feedbackActions from '../actions/feedback'
import * as overviewActions from '../actions/overview'
import { APIPlayerOverviewSelections, APILockSelectionsPayload } from '../../../types/api'

export const SELECT_OVERVIEW_CHOICE = 'SELECT_OVERVIEW_CHOICE'
export const DESELECT_OVERVIEW_CHOICE = 'DESELECT_OVERVIEW_CHOICE'
export const LOCK_SELECTED_CHOICES_START = 'LOCK_SELECTED_CHOICES_START'
export const LOCK_SELECTED_CHOICES_SUCCESS = 'LOCK_SELECTED_CHOICES_SUCCESS'
export const LOCK_SELECTED_CHOICES_FAIL = 'LOCK_SELECTED_CHOICES_FAIL'
export const UNLOCK_SELECTED_CHOICES_START = 'UNLOCK_SELECTED_CHOICES_START'
export const UNLOCK_SELECTED_CHOICES_SUCCESS = 'UNLOCK_SELECTED_CHOICES_SUCCESS'
export const UNLOCK_SELECTED_CHOICES_FAIL = 'UNLOCK_SELECTED_CHOICES_FAIL'

interface UndefinedPlayerSelections {
  selections?: OverviewPlayerSelection[]
}

const _selectOverviewChoice = (selectedChoice: SelectedChoice) => action(
  SELECT_OVERVIEW_CHOICE,
  selectedChoice
)

const _deselectOverviewChoice = (battletag: string, selectionChoice: OverviewSelectionChoice) => action(
  DESELECT_OVERVIEW_CHOICE,
  {
    battletag,
    selectionChoice
  }
)

export const selectChoice = (battletag, choice) => {
  return (dispatch, getState: () => ApplicationState) => {
    const { overview, overviewSelections } = getState()
    const { selections: playerSelections = [] } = (overview.find(o => o.battletag === battletag) || ({} as UndefinedPlayerSelections))
    const playerChoice = playerSelections.find(s => s.choice === choice)

    if (!playerChoice) return

    const playerOverviewSelections = overviewSelections[battletag] || {}
    const availableSelectionChoice = OVERVIEW_SELECTION_CHOICES.find(c => !playerOverviewSelections[c])
    const alreadySelectedChoice = OVERVIEW_SELECTION_CHOICES.find(c => playerOverviewSelections[c] === choice)

    if (availableSelectionChoice && !alreadySelectedChoice) {
      dispatch(_selectOverviewChoice({
        battletag,
        playerChoice: choice,
        selectionChoice: availableSelectionChoice
      }))
    } else if (alreadySelectedChoice) {
      dispatch(_deselectOverviewChoice(battletag, alreadySelectedChoice))
    }
  }
}

const _lockSelectedChoicesStart = (battletag: string) => action(
  LOCK_SELECTED_CHOICES_START,
  battletag
)
const _lockSelectedChoicesSuccess = (battletag: string) => action(
  LOCK_SELECTED_CHOICES_SUCCESS,
  battletag
)
const _lockSelectedChoicesFail = (battletag: string, error: Error) => action(
  LOCK_SELECTED_CHOICES_FAIL,
  { battletag, error }
)

const lockSelectedChoices = (battletag: string) => {
  return async (dispatch, getState: () => ApplicationState) => {
    const { overviewSelections, config } = getState()
    const playerOverviewSelections: APIPlayerOverviewSelections = overviewSelections[battletag]

    const { adminLockSelectionsEndpoint } = config
    dispatch(_lockSelectedChoicesStart(battletag))

    const payload: APILockSelectionsPayload = { battletag, playerOverviewSelections }

    try {
      const response = await window.fetch(
        adminLockSelectionsEndpoint,
        {
          body: JSON.stringify(payload),
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw Error('Could not lock player selection data')
      }

      dispatch(_lockSelectedChoicesSuccess(battletag))
      dispatch(feedbackActions.show(`Selections for player "${battletag}" locked!`, 'success'))
      dispatch(overviewActions.getOverviewData({ noFeedback: true }))
    } catch (err) {
      dispatch(_lockSelectedChoicesFail(battletag, err))
      dispatch(feedbackActions.show(`Could not lock selections for player "${battletag}"!`, 'warning'))
    }
  }
}

const _unlockSelectedChoicesStart = (battletag: string) => action(
  UNLOCK_SELECTED_CHOICES_START,
  battletag
)
const _unlockSelectedChoicesSuccess = (battletag: string) => action(
  UNLOCK_SELECTED_CHOICES_SUCCESS,
  battletag
)
const _unlockSelectedChoicesFail = (battletag: string) => action(
  UNLOCK_SELECTED_CHOICES_FAIL,
  battletag
)

const unlockSelectedChoices = (battletag: string) => {
  return (dispatch, getState: () => ApplicationState) => {
    dispatch(_unlockSelectedChoicesStart(battletag))
  }
}

export const toggleLockSelectedChoices = (battletag: string) => {
  return (dispatch, getState: () => ApplicationState) => {
    dispatch(lockSelectedChoices(battletag))
  }
}

export type OverviewSelectionsActions = ReturnType<
  | typeof _selectOverviewChoice
  | typeof _deselectOverviewChoice
  | typeof _lockSelectedChoicesStart
  | typeof _lockSelectedChoicesSuccess
  | typeof _lockSelectedChoicesFail
  | typeof _unlockSelectedChoicesStart
  | typeof _unlockSelectedChoicesSuccess
  | typeof _unlockSelectedChoicesFail
>
