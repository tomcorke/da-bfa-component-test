import { Reducer } from 'redux'

import * as overviewSelectionsActions from '../actions/overview-selections'

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
  {
    battletag,
    className,
    specName,
    selectionChoice
  }: {
    battletag: string
    className: string
    specName: string
    selectionChoice: string
  }): OverviewSelectionsState => {
  const clonedState = clone(state)
  const player = clonedState[battletag] = clonedState[battletag] || {}
  player[selectionChoice] = { class: className, spec: specName }
  return clonedState
}

const deselectChoice = (
  state: OverviewSelectionsState,
  {
    battletag,
    selectionChoice
  }: {
    battletag: string
    selectionChoice: string
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
