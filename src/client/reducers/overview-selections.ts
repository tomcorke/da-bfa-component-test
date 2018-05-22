import { Reducer } from 'redux'

import * as overviewActions from '../actions/overview-selections'

export type OverviewSelection = {
  class?: string,
  spec?: string
}

export type OverviewSelections = {
  [selectionChoice: string]: OverviewSelection
}

export type OverviewSelectionsState = {
  [battletag: string]: OverviewSelections
}

const initialState = {}

function clone<T> (data: T) { return JSON.parse(JSON.stringify(data)) as T }

const selectChoice = (
  state: OverviewSelectionsState,
  battletag: string,
  className: string,
  spec: string,
  selectionChoice): OverviewSelectionsState => {
  const clonedState = clone(state)
  const player = clonedState[battletag] = clonedState[battletag] || {}
  player[selectionChoice] = { class: className, spec }
  return clonedState
}

const deselectChoice = (
  state: OverviewSelectionsState,
  battletag: string,
  selectionChoice: string): OverviewSelectionsState => {
  const clonedState = clone(state)
  if (clonedState[battletag]) {
    clonedState[battletag][selectionChoice] = undefined
  }
  return clonedState
}

const OverviewSelectionsReducer: Reducer<OverviewSelectionsState> = (state = initialState, action) => {
  switch (action.type) {
    case overviewActions.SELECT_OVERVIEW_CHOICE:
      return selectChoice(state, action.battletag, action.class, action.spec, action.selectionChoice)
    case overviewActions.DESELECT_OVERVIEW_CHOICE:
      return deselectChoice(state, action.battletag, action.selectionChoice)
    default:
      return state
  }
}

export default OverviewSelectionsReducer
