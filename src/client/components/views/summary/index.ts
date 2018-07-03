import { connect } from 'react-redux'

import SummaryView from './summary'
import { ApplicationState } from '../../../redux/reducers'
import { APISummarySelection } from '../../../../types/api'

/*
export interface APISummarySelection {
  playerName: string
  class: WowClassSafeName
  spec: WowSpecSafeName
  choice: LockSelectionChoice
  locked: boolean
  confirmed: boolean
  tags: WowTag[]
}
*/

const ConnectedSummaryView = connect(
  (state: ApplicationState) => {

    const overviewSelectionsAsSummaryData: APISummarySelection[] = state.overview.reduce((selections, player) => {
      const newData: APISummarySelection[] = []
      const playerOverviewSelections = state.overviewSelections[player.battletag]
      if (playerOverviewSelections) {
        const main = playerOverviewSelections.main
        if (main) {
          const playerSelection = player.selections.find(s => s.choice === main)
          if (playerSelection) {
            /* no */
          }
        }
        const alt = playerOverviewSelections.alt
        if (alt) {
          /* no */
        }
      }
      return selections.concat(newData)
    }, [] as APISummarySelection[])

    return {
      selections: state.summary.summaryData.selections
    }
  }
)(SummaryView)

export default ConnectedSummaryView
