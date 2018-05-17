import * as overviewActions from '../actions/overview'
import classes from '../data/classes'

const initialState = []

const getClass = (name) => {
  return classes.find(c => c.safeName === name)
}
const getSpec = (wowClass, name) => {
  return wowClass && wowClass.specialisations && wowClass.specialisations.find(s => s.safeName === name)
}

const joinOverviewData = (data) => {
  const { userSelectionData, userProfileData } = data

  return Object.entries(userSelectionData).map(([battletag, selections]) => ({
    battletag,
    characters: (userProfileData[battletag] || {}).characters || [],
    selections: Object.entries(selections)
      .filter(([key, value]) => value.selected)
      .map(([key, value]) => {
        const selectedClass = getClass(value.selected.class) || {}
        const selectedSpec = getSpec(selectedClass, value.selected.spec) || {}

        return {
          choice: key,
          class: selectedClass.name,
          classSafeName: selectedClass.safeName,
          spec: selectedSpec.name,
          specSafeName: selectedSpec.safeName,
          tags: selectedSpec.tags,
          comments: value.comments
        }
      })
  }))
}

const selectChoice = (state, battletag, choice) => {
  const clonedState = JSON.parse(JSON.stringify(state))
  const playerData = clonedState.find(player => player.battletag === battletag)
  playerData.selections.forEach(selection => {
    if (selection.choice === choice) {
      // toggle clicked selection
      selection.selected = !selection.selected
    } else {
      selection.selected = false
    }
  })
  return clonedState
}

const OverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case overviewActions.HANDLE_OVERVIEW_DATA:
      return joinOverviewData(action.data)
    case overviewActions.SELECT_OVERVIEW_CHOICE:
      return selectChoice(state, action.battletag, action.choice)
    default:
      return state
  }
}

export default OverviewReducer
