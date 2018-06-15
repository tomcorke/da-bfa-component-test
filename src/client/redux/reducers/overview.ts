import { Reducer } from 'redux'

import * as overviewActions from '../actions/overview'
import classes, { SafeWowClass, SafeWowSpecialisation } from '../../data/classes'
import { APIOverviewData, APIPlayerCharacter, APIPlayerSelections, LockSelectionChoice, PlayerSelectionChoice, PLAYER_SELECTION_CHOICES } from '../../../types/api'
import { UserSelection } from './user-data'

export interface OverviewPlayerSelection {
  choice: PlayerSelectionChoice
  class?: string
  classSafeName?: string
  spec?: string
  specSafeName?: string
  tags: string[]
  comments?: string
  locked: boolean
  lockedChoice?: LockSelectionChoice
}

export interface OverviewPlayerData {
  battletag: string
  characters: APIPlayerCharacter[]
  selections: OverviewPlayerSelection[]
  locked: boolean
  confirmed: boolean
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
  const { userSelectionData, lockedSelectionData, userProfileData } = data

  return Object.entries(userSelectionData).map(([battletag, selections]) => {

    const characters = (userProfileData[battletag] || {}).characters || []
    const lockData = lockedSelectionData[battletag] || {}

    return {
      battletag,
      characters,
      selections: PLAYER_SELECTION_CHOICES
        .filter((choice) => selections[choice] && selections[choice].class)
        .map((choice) => {
          // Workaround for typescript not recognising filter above validated that value is defined
          let selection = selections[choice]
          selection = selection || ({} as UserSelection)

          const selectedClass = getClass(selection.class) || ({} as UndefinedWowClass)
          const selectedSpec = getSpec(selectedClass, selection.spec) || ({} as UndefinedWowSpec)

          const classAndSpecTags = Array.from(new Set(
            (selectedClass.tags || [])
              .concat(selectedSpec.tags || [])
          ))

          return {
            choice,
            class: selectedClass.name,
            classSafeName: selectedClass.safeName,
            spec: selectedSpec.name,
            specSafeName: selectedSpec.safeName,
            tags: classAndSpecTags,
            comments: selection.comments,
            locked: selection.locked,
            lockedChoice: selection.lockedChoice
          }
        }),
      ...lockData
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
