import { connect } from 'react-redux'

import actions from '../../../../../actions'

import PlayerSelection from './player-selection'

const ConnectedPlayerSelection = connect(
  (state, props) => {
    const playerData = state.overview
      .find(i => i.battletag === props.battletag)
    const selection = playerData.selections
      .find(s => s.choice === props.choice)
    const characters = playerData.characters

    return {
      selection,
      characters
    }
  },
  (dispatch, props) => ({
    onSelect: () => dispatch(actions.overview.selectChoice(props.battletag, props.choice))
  })
)(PlayerSelection)

export default ConnectedPlayerSelection
