import { connect } from 'react-redux'

import actions from '../../../../../actions'

import PlayerSelection, { PlayerSelectionProps } from './player-selection'
import { ApplicationState } from '../../../../../reducers'
import { OverviewSelection } from '../../../../../reducers/overview-selections'
import { APIUserCharacter } from '../../../../../../types/api'

interface OwnProps {
  battletag: string
  choice: string
}

const ConnectedPlayerSelection = connect(
  (state: ApplicationState, props: OwnProps) => {
    const playerData = state.overview
      .find(i => i.battletag === props.battletag)
    const selection = playerData.selections
      .find(s => s.choice === props.choice)

    const overviewSelections = state.overviewSelections[props.battletag] || {}
    const overviewSelection = Object.keys(overviewSelections)
      .find(s => {
        return overviewSelections[s] &&
          selection &&
          overviewSelections[s].class === selection.classSafeName &&
          overviewSelections[s].spec === selection.specSafeName
      })

    const characters = playerData.characters

    return {
      selection,
      overviewSelection,
      characters
    }
  },
  (dispatch, props) => ({
    onSelect: () => dispatch(actions.overviewSelections.selectChoice(props.battletag, props.choice))
  })
)(PlayerSelection)

export default ConnectedPlayerSelection
