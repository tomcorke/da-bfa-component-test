import * as React from 'react'

import SummaryBox from './components/summary-box'
import PlayerDisplay from './components/player-display'
import HandyLinks from './components/handy-links'

import * as STYLES from './overview.scss'

interface OverviewViewProps {
  battletags: string[]
  showAltSummary: boolean
  toggleShowAltSummary: () => any
  showLockedInSummary: boolean
  toggleShowLockedInSummary: () => any
}

const OverviewView = ({
  battletags,
  showAltSummary,
  toggleShowAltSummary,
  showLockedInSummary,
  toggleShowLockedInSummary
}: OverviewViewProps) => {
  const selectionsDisplay = battletags.map(battletag => {
    return <PlayerDisplay
      key={battletag}
      battletag={battletag}
    />
  })

  return (
    <div className={STYLES.overview}>

      <div className={STYLES.summaryContainer}>
        <SummaryBox title='Total summary' />
        { showLockedInSummary
          ? [
            <SummaryBox key='locked mains' title='Locked-in mains' selectionFilter={selection => selection.locked && selection.lockedChoice === 'main'} />
          ]
          : [
            <SummaryBox key='selected-mains' title='Selected mains' selectionFilter={selection => selection.overviewSelection === 'main'} />
          ]
        }
      </div>

      <div className={STYLES.options}>
        <label>
          <input type='checkbox' checked={showLockedInSummary} onChange={toggleShowLockedInSummary} />
          Show locked-in summary instead of selected
        </label>
      </div>

      <div className={STYLES.handyLinks}>
        <HandyLinks />
      </div>

      <div className={STYLES.selectionsContainer}>
        <div className={STYLES.selectionsHeader}>Player Selections ({battletags.length})</div>
        <div className={STYLES.selectionsBlurb}>Click on a player's chosen class to select it and update the summary above</div>
        {selectionsDisplay}
      </div>

    </div>
  )
}

export default OverviewView
