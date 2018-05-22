import { action } from 'typesafe-actions'
import { OverviewState, OverviewUserSelection } from '../reducers/overview'
import { OverviewSelectionsState } from '../reducers/overview-selections'
import { ApplicationState } from '../reducers'

export const SELECT_OVERVIEW_CHOICE = 'SELECT_OVERVIEW_CHOICE'
export const DESELECT_OVERVIEW_CHOICE = 'DESELECT_OVERVIEW_CHOICE'
export const SAVE_SELECTED_CHOICES = 'SAVE_SELECTED_CHOICES'

const SELECTION_CHOICES = ['first', 'second']

type UndefinedPlayerSelections = {
  selections?: OverviewUserSelection[]
}

const _selectOverviewChoice = (battletag: string, className: string, specName: string, selectionChoice: string) => action(
  SELECT_OVERVIEW_CHOICE,
  {
    battletag,
    className,
    specName,
    selectionChoice
  }
)

const _deselectOverviewChoice = (battletag: string, selectionChoice: string) => action(
  DESELECT_OVERVIEW_CHOICE,
  {
    battletag,
    selectionChoice
  }
)

export const selectChoice = (battletag, choice) => {
  return (dispatch, getState: () => ApplicationState) => {
    const { overview, overviewSelections } = getState()
    const { selections: playerSelections = [] } = (overview.find(o => o.battletag === battletag) || ({} as UndefinedPlayerSelections))
    const playerChoice = playerSelections.find(s => s.choice === choice)

    if (!playerChoice) return

    const playerOverviewSelections = overviewSelections[battletag] || {}
    const selectionChoice = SELECTION_CHOICES.find(c => !playerOverviewSelections[c])

    const alreadySelectedChoice = Object.entries(playerOverviewSelections)
      .find(([selectionChoice, value]) => {
        return playerChoice &&
          value &&
          value.class === playerChoice.classSafeName &&
          value.spec === playerChoice.specSafeName
      })

    if (selectionChoice && !alreadySelectedChoice) {
      dispatch(_selectOverviewChoice(battletag, playerChoice.classSafeName, playerChoice.specSafeName, selectionChoice))
      dispatch(saveSelectedChoices())
    } else if (alreadySelectedChoice) {
      dispatch(_deselectOverviewChoice(battletag, alreadySelectedChoice[0]))
      dispatch(saveSelectedChoices())
    }
  }
}

const _saveSelectedChoices = (selections: { battletag: string, class: string, spec: string }) => action(
  SAVE_SELECTED_CHOICES,
  selections
)

export const saveSelectedChoices = () => {
  return async (dispatch, getState) => {
    const { overview } = getState()

    const playerSelections = overview
      .map(player => {
        const selectedSelection = player.selections.find(selection => selection.selected) || {}
        return {
          battletag: player.battletag,
          class: selectedSelection.classSafeName,
          spec: selectedSelection.specSafeName
        }
      })
      .filter(selections => selections.class)

    dispatch(_saveSelectedChoices(playerSelections))
  }
}

export type OverviewSelectionsActions = ReturnType<
  | typeof _selectOverviewChoice
  | typeof _deselectOverviewChoice
  | typeof _saveSelectedChoices
>
