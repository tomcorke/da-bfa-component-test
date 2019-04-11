import { connect } from 'react-redux'

import SummaryView from './summary'

import * as overviewActions from '../../../redux/actions/overview'
import { ApplicationState, Dispatch } from '../../../redux/reducers'
import { APISummarySelection, LockSelectionChoice } from '../../../../types/api'
import { OverviewPlayerSelection, OverviewPlayerData } from '../../../redux/reducers/overview'
import { WowClassSafeName } from '../../../../types/classes'

const summarySelectionFromPlayerSelection = (
  player: OverviewPlayerData,
  playerSelection: OverviewPlayerSelection,
  choice: LockSelectionChoice): APISummarySelection => ({
    playerName: player.displayName || player.battletag,
    class: (playerSelection.class && playerSelection.class.safeName) as WowClassSafeName,
    spec: playerSelection.spec && playerSelection.spec.safeName,
    choice: choice,
    locked: false,
    confirmed: false,
    tags: playerSelection.tags
  })

const ConnectedSummaryView = connect(
  (state: ApplicationState) => {
    return {
      selections: state.summary.summaryData.selections
    }
  }
)(SummaryView)

export default ConnectedSummaryView
