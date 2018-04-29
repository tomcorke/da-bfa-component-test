import React from 'react'

import ClassIcon from '../../class-icon'
import RoleIcon from '../../role-icon'

import classes from '../../../data/classes'

import STYLES from './overview.scss'

const BattleTag = ({ children }) => (
  <div className={STYLES.battletag}>{children}</div>
)

const getClass = (name) => {
  return classes.find(c => c.safeName === name)
}
const getSpec = (wowClass, name) => {
  return wowClass && wowClass.specialisations.find(s => s.safeName === name)
}
const getRoleTag = (spec) => {
  return ['tank', 'healer', 'dps'].find(tag => spec && spec.tags && spec.tags.includes(tag))
}

const Selection = ({ num, class: wowClass, spec, comments, selected, onClick }) => {
  return (
    <div className={STYLES.selection} data-comment={comments} data-selected={selected} onClick={onClick}>
      <div className={STYLES.choiceNumber}>
        {num}
      </div>
      <div className={STYLES.class}>
        <ClassIcon wowClass={wowClass.safeName} />
      </div>
      <div className={STYLES.role}>
        <RoleIcon role={getRoleTag(spec)} />
      </div>
      <div className={STYLES.spec}>
        {spec.name}
      </div>
    </div>
  )
}

const choiceNumbers = {
  first: 1,
  second: 2,
  third: 3
}

const Selections = ({ selections, onChoiceSelect }) => {
  return (
    <div className={STYLES.selections}>
      {selections.map(choice => {
        return <Selection
          key={choice.choice}
          num={choiceNumbers[choice.choice]}
          {...choice.data}
          selected={choice.selected}
          onClick={() => {
            if (choice.selected) {
              onChoiceSelect(null)
            } else {
              onChoiceSelect(choice.choice)
            }
          }} />
      })}
    </div>
  )
}

const UserSelections = ({ data, onChoiceSelect }) => {
  return (
    <div className={STYLES.userSelections}>
      <BattleTag>{data.battletag}</BattleTag>
      <Selections selections={data.selections} onChoiceSelect={onChoiceSelect} />
    </div>
  )
}

const mapData = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    battletag: key,
    selections: Object.entries(value).map(([key, value]) => ({
      choice: key,
      data: {
        class: getClass(value.selected.class),
        spec: getSpec(getClass(value.selected.class), value.selected.spec) || {},
        comments: value.comments
      }
    }))
  }))
}

const sumTags = (data) => {
  const flatTags = data.reduce((allTags, user) => {
    user && user.forEach(tags => allTags.push(tags))
    return allTags
  }, [])
  const uniqueTags = new Set()
  data.forEach(user => user.forEach(tags => tags && tags.forEach(tag => uniqueTags.add(tag))))
  return Array.from(uniqueTags).reduce((tagSums, tag) => {
    tagSums[tag] = flatTags.filter(tags => tags && tags.includes(tag)).length
    return tagSums
  }, {})
}

const getTags = (data) => data.map(user => {
  return user.selections.map(selection => {
    return selection.data && selection.data.spec && selection.data.spec.tags
  })
})

const SUMMARY_TAG_GROUPS = {
  'Roles': ['tank', 'healer', 'dps'],
  'DPS': ['ranged', 'melee'],
  'Armour type': ['cloth', 'leather', 'mail', 'plate']
}

const SummaryRowTag = ({ name, value }) => {
  return (
    <div className={STYLES.summaryRowTag} data-has-value={value > 0}>
      <div className={STYLES.summaryRowTagName}>{name}</div>
      <div className={STYLES.summaryRowTagValue}>{value}</div>
    </div>
  )
}

const SummaryRow = ({ title, tags }) => {
  return (
    <div className={STYLES.summaryRow}>
      <div className={STYLES.summaryRowTitle}>
        {title}
      </div>
      <div className={STYLES.summaryRowTags}>
        {tags.map(t => <SummaryRowTag key={t.name} name={t.name} value={t.count} />)}
      </div>
    </div>
  )
}

const Summary = ({ title, tags }) => {
  return (
    <div className={STYLES.summary}>
      <div className={STYLES.summaryTitle}>{title}</div>
      {Object.entries(SUMMARY_TAG_GROUPS).map(([title, groupTags]) => {
        return <SummaryRow
          key={title}
          title={title}
          tags={groupTags.map(t => ({ name: t, count: tags[t] || 0 }))} />
      })}
    </div>
  )
}

class OverviewView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: mapData(props.viewData.overview)
    }
    this.selectChoice = this.selectChoice.bind(this)
  }

  selectChoice (battletag, choice) {
    const clonedData = JSON.parse(JSON.stringify(this.state.data))

    clonedData.forEach(user => {
      if (user.battletag === battletag) {
        user.selections.forEach(selection => {
          if (selection.choice === choice) {
            selection.selected = true
          } else {
            selection.selected = false
          }
        })
      }
    })

    this.setState({
      data: clonedData
    })
  }

  render () {
    const overview = this.state.data

    const selections = overview.map(data => {
      return <UserSelections
        key={data.battletag}
        {...{ data }}
        onChoiceSelect={(choice) => this.selectChoice(data.battletag, choice)} />
    })

    const tagData = getTags(overview)

    const selectedChoices = overview.map(user => ({
      battletag: user.battletag,
      selections: user.selections.filter(selection => selection.selected)
    }))

    const selectedTagData = getTags(selectedChoices)

    const summedTags = sumTags(tagData)
    const summedSelectedTags = sumTags(selectedTagData)

    const summary = <Summary title='Total summary' tags={summedTags} />
    const selectedSummary = <Summary title='Selected summary' tags={summedSelectedTags} />

    return <div className={STYLES.overview}>

      <div className={STYLES.summaryContainer}>
        {summary}
        {selectedSummary}
      </div>

      <div className={STYLES.selectionsContainer}>
        <div className={STYLES.selectionsHeader}>Selections</div>
        <div className={STYLES.selectionsBlurb}>Click on a user's chosen class to select it and update the summary above</div>
        {selections}
      </div>

    </div>
  }
}

export default OverviewView
