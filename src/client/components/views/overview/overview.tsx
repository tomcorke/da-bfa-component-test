import * as React from 'react'

import SummaryBox from './components/summary-box'
import PlayerDisplay from './components/player-display'

import * as STYLES from './overview.scss'

const OverviewView = ({ battletags, showBackupSummary, toggleShowBackupSummary }) => {
  const selectionsDisplay = battletags.map(battletag => {
    return <PlayerDisplay
      key={battletag}
      battletag={battletag}
    />
  })

  return <div className={STYLES.overview}>

    <div className={STYLES.summaryContainer}>
      <SummaryBox title='Total summary' />
      <SummaryBox title='Main selected summary' selectionFilter={selection => selection.overviewSelection === 'first'} />
      {showBackupSummary && <SummaryBox title='Backup selected summary' selectionFilter={selection => selection.overviewSelection === 'second'} />}
    </div>

    <div className={STYLES.options}>
      <label>
        <input type='checkbox' checked={showBackupSummary} onChange={toggleShowBackupSummary} />
        Show backup selection summary
      </label>
    </div>

    <div className={STYLES.selectionsContainer}>
      <div className={STYLES.selectionsHeader}>Player Selections ({battletags.length})</div>
      <div className={STYLES.selectionsBlurb}>Click on a player's chosen class to select it and update the summary above</div>
      {selectionsDisplay}
    </div>

  </div>
}

export default OverviewView
