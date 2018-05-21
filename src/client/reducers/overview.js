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

const OverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case overviewActions.HANDLE_OVERVIEW_DATA:
      return joinOverviewData(action.data)
    default:
      return state
  }
}

export default OverviewReducer
