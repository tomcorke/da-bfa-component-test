import { Reducer } from 'redux'

import * as overviewActions from '../actions/overview'
import { getClass, getSpec } from '../../../data/classes'
import { APIOverviewData, APIPlayerCharacter, LockSelectionChoice, PlayerSelectionChoice, PLAYER_SELECTION_CHOICES } from '../../../types/api'
import { UserSelection } from './user-data'
import { WowClass, WowSpecialisation, WowTag } from '../../../types/classes'

export interface OverviewPlayerSelection {
  choice: PlayerSelectionChoice
  class?: WowClass
  spec?: WowSpecialisation
  tags: WowTag[]
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

          const selectedClass = selection.class && getClass(selection.class)
          const selectedSpec = selection.class && selection.spec && getSpec(selection.class, selection.spec)

          const classAndSpecTags = Array.from(new Set(
            (selectedClass && selectedClass.tags || [])
              .concat(selectedSpec && selectedSpec.tags || [])
          ))

          return {
            choice,
            class: selectedClass,
            spec: selectedSpec,
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
