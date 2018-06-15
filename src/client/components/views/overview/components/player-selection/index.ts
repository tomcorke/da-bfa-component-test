import { connect } from 'react-redux'

import actions from '../../../../../redux/actions'

import PlayerSelection from './player-selection'
import { ApplicationState, Dispatch } from '../../../../../redux/reducers'
import { OverviewPlayerData } from '../../../../../redux/reducers/overview'
import { LOCK_SELECTION_CHOICES, PlayerSelectionChoice } from '../../../../../../types/api'

interface OwnProps {
  battletag: string
  choice: PlayerSelectionChoice
}

const ConnectedPlayerSelection = connect(
  (state: ApplicationState, props: OwnProps) => {
    const playerData = state.overview
      .find(i => i.battletag === props.battletag) || ({} as OverviewPlayerData)
    const selection = playerData.selections
      .find(s => s.choice === props.choice)

    const overviewSelections = state.overviewSelections[props.battletag] || {}
    const overviewSelection = LOCK_SELECTION_CHOICES
      .find(s => {
        const overviewSelection = overviewSelections[s]
        return (
          overviewSelection &&
          selection &&
          overviewSelection === selection.choice
        ) || false
      })

    const characters = playerData.characters

    return {
      selection,
      overviewSelection,
      characters
    }
  },
  (dispatch: Dispatch, props) => ({
    onSelect: () => dispatch(actions.overviewSelections.selectChoice(props.battletag, props.choice))
  })
)(PlayerSelection)

export default ConnectedPlayerSelection
