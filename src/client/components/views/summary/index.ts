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

    const overviewSelectionsAsSummaryData: APISummarySelection[] = state.overview.reduce((selections, player) => {
      const newData: APISummarySelection[] = []
      const playerOverviewSelections = state.overviewSelections[player.battletag]
      if (playerOverviewSelections) {
        const main = playerOverviewSelections.main
        if (main) {
          const playerSelection = player.selections.find(s => s.choice === main)
          if (playerSelection && playerSelection.class) {
            newData.push(summarySelectionFromPlayerSelection(
              player,
              playerSelection,
              'main'
            ))
          }
        }
        const alt = playerOverviewSelections.alt
        if (alt) {
          const playerSelection = player.selections.find(s => s.choice === alt)
          if (playerSelection && playerSelection.class) {
            newData.push(summarySelectionFromPlayerSelection(
              player,
              playerSelection,
              'alt'
            ))
          }
        }
      }
      return selections.concat(newData)
    }, [] as APISummarySelection[])

    return {
      selections: state.overviewSettings.showLockedInSummary
        ? state.summary.summaryData.selections
        : overviewSelectionsAsSummaryData,
      showAltSummary: state.overviewSettings.showAltSummary,
      showLockedInSummary: state.overviewSettings.showLockedInSummary
    }
  },
  (dispatch: Dispatch) => ({
    toggleShowAltSummary: () => dispatch(overviewActions.toggleShowAltSummary),
    toggleShowLockedInSummary: () => dispatch(overviewActions.toggleShowLockedInSummary)
  })
)(SummaryView)

export default ConnectedSummaryView
