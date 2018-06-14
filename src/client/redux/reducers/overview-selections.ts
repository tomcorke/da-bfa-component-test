import { Reducer } from 'redux'
import { PlayerSelectionChoice } from '../../../types/api'

import * as overviewSelectionsActions from '../actions/overview-selections'

export const OVERVIEW_SELECTION_CHOICES: OverviewSelectionChoice[] = ['first', 'second']
export type OverviewSelectionChoice = 'first' | 'second'

export interface OverviewSelections {
  [key: string]: PlayerSelectionChoice | undefined
  first?: PlayerSelectionChoice
  second?: PlayerSelectionChoice
}

export interface OverviewSelectionsState {
  [battletag: string]: OverviewSelections
}

export interface SelectedChoice {
  battletag: string
  playerChoice: PlayerSelectionChoice
  selectionChoice: OverviewSelectionChoice
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
    selectionChoice: OverviewSelectionChoice
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
