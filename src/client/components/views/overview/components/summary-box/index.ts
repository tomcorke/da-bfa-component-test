import { connect } from 'react-redux'
import { UserSelection } from '../../../../../redux/reducers/user-data'
import { OverviewSelections } from '../../../../../redux/reducers/overview-selections'
import { OverviewPlayerSelection } from '../../../../../redux/reducers/overview'
import { ApplicationState } from '../../../../../redux/reducers'

import SummaryBox from './summary-box'

const joinWithOverviewSelections = (playerOverviewSelections: OverviewSelections = ({} as OverviewSelections)) => (selection: OverviewPlayerSelection) => {

  const overviewSelection = Object.keys(playerOverviewSelections)
    .find((key: string) => {
      const os = playerOverviewSelections[key]
      return (
        os &&
        selection &&
        selection.choice === os
      ) ||
        false
    })

  return {
    ...selection,
    overviewSelection
  }
}

interface SelectionsSummaryData {
  tags: string[],
  class?: string
}

const ConnectedSummaryBox = connect(
  (state: ApplicationState, props: { selectionFilter?: (selection: any) => boolean }) => {
    const noUndefinedFilter = (selection: UserSelection) => !!selection.class
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
