import { Reducer } from 'redux'
import { PlayerSelectionChoice, LockSelectionChoice } from '../../../types/api'

import * as overviewSelectionsActions from '../actions/overview-selections'

export interface OverviewSelections {
  [key: string]: PlayerSelectionChoice | undefined
  main?: PlayerSelectionChoice
  alt?: PlayerSelectionChoice
}

export interface OverviewSelectionsState {
  [battletag: string]: OverviewSelections
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
  if (clonedState[battletag]) {
    clonedState[battletag][selectionChoice] = undefined
  }
  return clonedState
}

const OverviewSelectionsReducer: Reducer<OverviewSelectionsState, overviewSelectionsActions.OverviewSelectionsActions> = (state = initialState, action) => {
  switch (action.type) {
    case overviewSelectionsActions.SELECT_OVERVIEW_CHOICE:
      return selectChoice(state, action.payload)
    case overviewSelectionsActions.DESELECT_OVERVIEW_CHOICE:
      return deselectChoice(state, action.payload)
    default:
      return state
  }
}

export default OverviewSelectionsReducer
