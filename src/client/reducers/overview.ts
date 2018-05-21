import { Reducer } from 'redux'

import * as overviewActions from '../actions/overview'
import classes from '../data/classes'

export type OverviewState = {
  battletag: string,
  characters: any[],
  selections: string[]
}[]

const initialState: OverviewState = []

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

        const classAndSpecTags = Array.from(new Set(
          (selectedClass.tags || [])
            .concat(selectedSpec.tags || [])
        ))

        return {
          choice: key,
          class: selectedClass.name,
          classSafeName: selectedClass.safeName,
          spec: selectedSpec.name,
          specSafeName: selectedSpec.safeName,
          tags: classAndSpecTags,
          comments: value.comments
        }
      })
  }))
}

const OverviewReducer: Reducer<OverviewState> = (state: OverviewState = initialState, action): OverviewState => {
  switch (action.type) {
    case overviewActions.HANDLE_OVERVIEW_DATA:
      return joinOverviewData(action.data)
    default:
      return state
  }
}

export default OverviewReducer
