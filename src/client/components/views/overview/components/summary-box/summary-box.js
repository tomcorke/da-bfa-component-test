import React from 'react'

import SummaryRow from '../summary-row'

import STYLES from './summary-box.scss'

const mapToArray = (map) => Object.entries(map).map(([key, value]) => ({ key, value }))

const SUMMARY_TAG_GROUPS = {
  'Roles': ['tank', 'healer', 'dps'],
  'DPS': ['ranged', 'melee'],
  'Armour type': ['cloth', 'leather', 'mail', 'plate']
}

const getTags = (selections) => selections.map(selection => selection.tags)

const flatten = (nestedItems) => nestedItems.reduce((flat, items) => flat.concat(items), [])

const sumBySelector = (items, selector) => items
  .reduce((sums, item) => ({ ...sums, [selector(item)]: (sums[selector(item)] || 0) + 1 }), {})

const sumTags = (tags) => sumBySelector(tags, tag => tag)

const sumSelectionTags = (selections) => sumTags(flatten(getTags(selections)))

const getClasses = (selections) => selections
  .map(selection => selection.class)

const sumClasses = (classes) => sumBySelector(classes, c => c)

const sumSelectionClasses = (selections) => sumClasses(flatten(getClasses(selections)))

const SummaryBox = ({ title, allSelections }) => {
  const tags = sumSelectionTags(allSelections)
  const classes = sumSelectionClasses(allSelections)

  return (
    <div className={STYLES.summaryBox}>
      <div className={STYLES.summaryTitle}>{title}</div>
      {Object.entries(SUMMARY_TAG_GROUPS).map(([title, groupTags]) => {
        return <SummaryRow
          key={title}
          title={title}
          values={groupTags.map(t => ({ name: t, count: tags[t] || 0 }))} />
      })}
      <SummaryRow
        key='classes'
        title='Classes'
        values={mapToArray(classes)
          .map(i => ({ name: i.key, count: i.value }))
          .sort((a, b) => a.name < b.name ? -1 : 1)} />
    </div>
  )
}

export default SummaryBox
