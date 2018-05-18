import { connect } from 'react-redux'

import SummaryBox from './summary-box'

const ConnectedSummaryBox = connect(
  (state, props) => {
    const noUndefinedFilter = selection => !!selection.class
    const selectionFilter = props.selectionFilter || (() => true)
    return {
      allSelections: state.overview
        .reduce((allSelections, player) =>
          allSelections.concat(player.selections
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
