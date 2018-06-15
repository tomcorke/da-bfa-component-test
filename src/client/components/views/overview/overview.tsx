import * as React from 'react'

import SummaryBox from './components/summary-box'
import PlayerDisplay from './components/player-display'

import * as STYLES from './overview.scss'

interface OverviewViewProps {
  battletags: string[]
  showBackupSummary: boolean
  toggleShowBackupSummary: () => any
  showSelectionLockIn: boolean
  toggleShowSelectionLockIn: () => any
}

const OverviewView = ({
  battletags,
  showBackupSummary,
  toggleShowBackupSummary,
  showSelectionLockIn,
  toggleShowSelectionLockIn
}: OverviewViewProps) => {
  const selectionsDisplay = battletags.map(battletag => {
    return <PlayerDisplay
      key={battletag}
      battletag={battletag}
    />
  })

  return <div className={STYLES.overview}>

    <div className={STYLES.summaryContainer}>
      <SummaryBox title='Total summary' />
      <SummaryBox title='Main selected summary' selectionFilter={selection => selection.overviewSelection === 'main'} />
      {showBackupSummary && <SummaryBox title='Backup selected summary' selectionFilter={selection => selection.overviewSelection === 'alt'} />}
    </div>

    <div className={STYLES.options}>
      <label>
        <input type='checkbox' checked={showBackupSummary} onChange={toggleShowBackupSummary} />
        Show backup selection summary
      </label>
      <label>
        <input type='checkbox' checked={showSelectionLockIn} onChange={toggleShowSelectionLockIn} />
        Show selection lock-in
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
