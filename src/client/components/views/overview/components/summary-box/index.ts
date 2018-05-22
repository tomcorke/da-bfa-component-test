import { connect } from 'react-redux'

import SummaryBox from './summary-box'
import { ApplicationState } from '../../../../../reducers'

const joinWithOverviewSelections = (playerOverviewSelections = {}) => (selection) => {
  const overviewSelection = Object.keys(playerOverviewSelections)
    .find(key => {
      const os = playerOverviewSelections[key]
      return os &&
        selection &&
        os.class === selection.classSafeName &&
        os.spec === selection.specSafeName
    })
  return {
    ...selection,
    overviewSelection
  }
}

const ConnectedSummaryBox = connect(
  (state: ApplicationState, props: { selectionFilter?: (selection: any) => boolean }) => {
    const noUndefinedFilter = selection => !!selection.class
    const selectionFilter = props.selectionFilter || (() => true)
    return {
      allSelections: state.overview
        .reduce((allSelections, player) =>
          allSelections.concat(player.selections
            .map(joinWithOverviewSelections(state.overviewSelections[player.battletag]))
            .filter(noUndefinedFilter)
            .filter(selectionFilter)
            .map(selection => ({
              tags: selection.tags,
              class: selection.class
            }))
          ),
        [])
    }
  }
)(SummaryBox)

export default ConnectedSummaryBox
