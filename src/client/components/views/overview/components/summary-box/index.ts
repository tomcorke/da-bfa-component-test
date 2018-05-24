import { connect } from 'react-redux'

import SummaryBox from './summary-box'
import { ApplicationState } from '../../../../../reducers'
import { APIUserSelection, APIUserSelections } from '../../../../../../types/api'

const joinWithOverviewSelections = (playerOverviewSelections: APIUserSelections = {}) => (selection) => {
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

interface SelectionsSummaryData {
  tags: string[],
  class: string
}

const ConnectedSummaryBox = connect(
  (state: ApplicationState, props: { selectionFilter?: (selection: any) => boolean }) => {
    const noUndefinedFilter = (selection: APIUserSelection) => !!selection.class
    const selectionFilter = props.selectionFilter || (() => true)
    return {
      allSelections: state.overview
        .reduce((allSelections: SelectionsSummaryData[], player) =>
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
