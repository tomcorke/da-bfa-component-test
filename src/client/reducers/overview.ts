import { Reducer } from 'redux'

import * as overviewActions from '../actions/overview'
import classes, { SafeWowClass, SafeWoWSpecialisation } from '../data/classes'
import { APIOverviewData, APIUserCharacter, APIUserSelections } from '../../types/api'

export type OverviewUserSelection = {
  choice: string
  class?: string
  classSafeName?: string
  spec?: string
  specSafeName?: string
  tags: string[]
  comments?: string
}

export type OverviewState = {
  battletag: string
  characters: APIUserCharacter[]
  selections: OverviewUserSelection[]
}[]

const initialState: OverviewState = []

function getClass (name): SafeWowClass {
  return classes.find(c => c.safeName === name)
}
function getSpec (wowClass, name): SafeWoWSpecialisation {
  return wowClass && wowClass.specialisations && wowClass.specialisations.find(s => s.safeName === name)
}

interface UndefinedWowClass {
  name: undefined
  safeName: undefined
  tags: undefined
}

interface UndefinedWowSpec {
  name: undefined
  safeName: undefined
  tags: undefined
}

function joinOverviewData (data: APIOverviewData): OverviewState {
  const { userSelectionData, userProfileData } = data

  return Object.entries(userSelectionData).map(([battletag, selections]) => ({
    battletag,
    characters: (userProfileData[battletag] || {}).characters || [],
    selections: Object.entries(selections)
      .filter(([key, value]) => value.selected)
      .map(([key, value]) => {
        const selectedClass = getClass(value.selected.class) || ({} as UndefinedWowClass)
        const selectedSpec = getSpec(selectedClass, value.selected.spec) || ({} as UndefinedWowSpec)

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

const OverviewReducer: Reducer<OverviewState, overviewActions.OverviewAction> = (state = initialState, action) => {
  switch (action.type) {
    case overviewActions.HANDLE_OVERVIEW_DATA:
      return joinOverviewData(action.payload)
    default:
      return state
  }
}

export default OverviewReducer
