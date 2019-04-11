import { Reducer } from 'redux'
import { PlayerSelectionChoice, LockSelectionChoice } from '../../../types/api'

import * as overviewSelectionsActions from '../actions/overview-selections'

export interface OverviewSelections {
  [key: string]: PlayerSelectionChoice | undefined
  main?: PlayerSelectionChoice
  alt?: PlayerSelectionChoice
}

export interface OverviewSelectionsState {
  [battletag: string]: OverviewSelections | undefined
}

export interface SelectedChoice {
  battletag: string
  playerChoice: PlayerSelectionChoice
  selectionChoice: LockSelectionChoice
}

const initialState = {}

function clone<T> (data: T) { return JSON.parse(JSON.stringify(data)) as T }

const selectChoice = (
  state: OverviewSelectionsState,
  { battletag, playerChoice, selectionChoice }: SelectedChoice): OverviewSelectionsState => {

  const clonedState = clone(state)
  const player = clonedState[battletag] = clonedState[battletag] || {}
  player[selectionChoice] = playerChoice
  return clonedState
}

const deselectChoice = (
  state: OverviewSelectionsState,
  {
    battletag,
    selectionChoice
  }: {
    battletag: string
    selectionChoice: LockSelectionChoice
  }): OverviewSelectionsState => {

  const clonedState = clone(state)
  const playerState = clonedState[battletag]
  if (playerState) {
    playerState[selectionChoice] = undefined
  }
  return clonedState
}

const deselectAllPlayerChoices = (
  state: OverviewSelectionsState,
  battletag: string
) => {
  const clonedState = clone(state)
  clonedState[battletag] = undefined
  return clonedState
}

const autoSelectAll = (state: OverviewSelectionsState, battletags: string[]): OverviewSelectionsState => {
  const newState: OverviewSelectionsState = {}
  battletags.forEach(battletag => {
    newState[battletag] = {
      main: 'first'
    }
  })
  return newState
}

const autoSelectLocked = (state: OverviewSelectionsState, lockedChoices: {
  battletag: string
  main: PlayerSelectionChoice
}[]): OverviewSelectionsState => {
  const newState = clone(state)
  lockedChoices.forEach(c => {
    newState[c.battletag] = {
      main: c.main
    }
  })
  return newState
}

const autoDeselectAll = (state: OverviewSelectionsState): OverviewSelectionsState => {
  return clone(initialState)
}

const OverviewSelectionsReducer: Reducer<OverviewSelectionsState, overviewSelectionsActions.OverviewSelectionsActions> = (state = initialState, action) => {
  switch (action.type) {
    case overviewSelectionsActions.SELECT_OVERVIEW_CHOICE:
      return selectChoice(state, action.payload)
    case overviewSelectionsActions.DESELECT_OVERVIEW_CHOICE:
      return deselectChoice(state, action.payload)
    case overviewSelectionsActions.DESELECT_ALL_PLAYER_OVERVIEW_CHOICES:
      return deselectAllPlayerChoices(state, action.payload)
    case overviewSelectionsActions.AUTO_SELECT_OVERVIEW_CHOICE_ALL:
      return autoSelectAll(state, action.payload)
    case overviewSelectionsActions.AUTO_SELECT_OVERVIEW_CHOICE_LOCKED:
      return autoSelectLocked(state, action.payload)
    case overviewSelectionsActions.AUTO_DESELECT_OVERVIEW_CHOICE_ALL:
      return autoDeselectAll(state)
    default:
      return state
  }
}

export default OverviewSelectionsReducer
