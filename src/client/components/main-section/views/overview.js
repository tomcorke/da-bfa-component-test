import React from 'react'

import ClassIcon from '../../class-icon'

import STYLES from './overview.scss'

const OverviewView = ({
  viewData
}) => {
  const { overview } = viewData

  const selections = Object.keys(overview).map(battletag => {
    return (
      <div key={battletag} className={STYLES.userSelections}>
        <div className={STYLES.battletag}>{battletag}</div>
        <div className={STYLES.selections}>
          {Object.keys(overview[battletag]).map(choice => {
            const userChoice = overview[battletag][choice]
            return (
              <div key={choice} className={STYLES.selection} title={userChoice.comments}>
                <div className={STYLES.class}>
                  <ClassIcon wowClass={userChoice.selected.class} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  })

  return <div className={STYLES.overview}>
    {selections}
  </div>
}

export default OverviewView
