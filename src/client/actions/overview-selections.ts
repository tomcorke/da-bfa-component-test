import { action } from 'typesafe-actions'
import { OverviewState, OverviewUserSelection } from '../reducers/overview'
import { OverviewSelectionsState } from '../reducers/overview-selections'
import { ApplicationState } from '../reducers'

export const SELECT_OVERVIEW_CHOICE = 'SELECT_OVERVIEW_CHOICE'
export const DESELECT_OVERVIEW_CHOICE = 'DESELECT_OVERVIEW_CHOICE'

const SELECTION_CHOICES = ['first', 'second']

type UndefinedPlayerSelections = {
  selections?: OverviewUserSelection[]
}

function entries<T> (obj: { [key: string]: T }): [string, T][] {
  const ownProps = Object.keys(obj)
  let i = ownProps.length
  const resArray = new Array(i)
  while (i--) {
    resArray[i] = [ownProps[i], obj[ownProps[i]]]
  }
  return resArray
}

export const selectChoice = (battletag, choice) => {
  return (dispatch, getState: () => ApplicationState) => {
    const { overview, overviewSelections } = getState()
    const { selections: playerSelections = [] } = (overview.find(o => o.battletag === battletag) || ({} as UndefinedPlayerSelections))
    const playerChoice = playerSelections.find(s => s.choice === choice)

    if (!playerChoice) return

    const playerOverviewSelections = overviewSelections[battletag] || {}
    const selectionChoice = SELECTION_CHOICES.find(c => !playerOverviewSelections[c])

    const alreadySelectedChoice = entries(playerOverviewSelections)
      .find(([selectionChoice, value]) => {
        return playerChoice &&
          value &&
          value.class === playerChoice.classSafeName &&
          value.spec === playerChoice.specSafeName
      })

    if (selectionChoice && !alreadySelectedChoice) {
      dispatch({
        type: SELECT_OVERVIEW_CHOICE,
        battletag,
        class: playerChoice.classSafeName,
        spec: playerChoice.specSafeName,
        selectionChoice
      })
      dispatch(saveSelectedChoices())
    } else if (alreadySelectedChoice) {
      dispatch({
        type: DESELECT_OVERVIEW_CHOICE,
        battletag,
        selectionChoice: alreadySelectedChoice[0]
      })
      dispatch(saveSelectedChoices())
    }
  }
}

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

    dispatch({
      type: 'SAVE_SELECTED_CHOICES',
      playerSelections
    })
  }
}
