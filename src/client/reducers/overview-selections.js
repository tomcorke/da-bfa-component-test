import * as overviewActions from '../actions/overview-selections'

const initialState = {}

const selectChoice = (state, battletag, className, spec, selectionChoice) => {
  const clonedState = JSON.parse(JSON.stringify(state))
  const player = clonedState[battletag] = clonedState[battletag] || {}
  player[selectionChoice] = { class: className, spec }
  return clonedState
}

const deselectChoice = (state, battletag, selectionChoice) => {
  const clonedState = JSON.parse(JSON.stringify(state))
  if (clonedState[battletag]) {
    clonedState[battletag][selectionChoice] = undefined
  }
  return clonedState
}

const OverviewSelectionsReducer = (state = initialState, action) => {
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
