import { Reducer } from 'redux'

import * as overviewActions from '../actions/overview'
import classes, { SafeWowClass, SafeWowSpecialisation } from '../../data/classes'
import { APIOverviewData, APIPlayerCharacter, APIPlayerSelections } from '../../../types/api'
import { flattenUserSelections, UserSelection } from './user-data'

export type OverviewPlayerSelection = {
  choice: string
  class?: string
  classSafeName?: string
  spec?: string
  specSafeName?: string
  tags: string[]
  comments?: string
}

export type OverviewPlayerData = {
  battletag: string
  characters: APIPlayerCharacter[]
  selections: OverviewPlayerSelection[]
}

export type OverviewState = OverviewPlayerData[]

const initialState: OverviewState = []

function getClass (name): SafeWowClass | undefined {
  return classes.find(c => c.safeName === name)
}
function getSpec (wowClass, name): SafeWowSpecialisation | undefined {
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

  return Object.entries(userSelectionData).map(([battletag, selections]) => {
    const flattenedSelections = flattenUserSelections(selections)

    return {
      battletag,
      characters: (userProfileData[battletag] || {}).characters || [],
      selections: Object.entries(flattenedSelections)
        .filter(([key, value]) => value && value.class)
        .map(([key, value]) => {
          // Workaround for typescript not recognising filter above validated that value is defined
          value = value || ({} as UserSelection)

          const selectedClass = getClass(value.class) || ({} as UndefinedWowClass)
          const selectedSpec = getSpec(selectedClass, value.spec) || ({} as UndefinedWowSpec)

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
    }
  })
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
