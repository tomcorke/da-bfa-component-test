import React from 'react'

import SummaryBox from './components/summary-box'
import PlayerDisplay from './components/player-display'

import STYLES from './overview.scss'

const OverviewView = ({ battletags }) => {
  const selectionsDisplay = battletags.map(battletag => {
    return <PlayerDisplay
      key={battletag}
      battletag={battletag}
    />
  })

  return <div className={STYLES.overview}>

    <div className={STYLES.summaryContainer}>
      <SummaryBox title='Total summary' />
      <SummaryBox title='Selected summary' selectionFilter={selection => selection.selected} />
    </div>

    <div className={STYLES.selectionsContainer}>
      <div className={STYLES.selectionsHeader}>Player Selections ({battletags.length})</div>
      <div className={STYLES.selectionsBlurb}>Click on a player's chosen class to select it and update the summary above</div>
      {selectionsDisplay}
    </div>

  </div>
}

export default OverviewView
