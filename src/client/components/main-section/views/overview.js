import React from 'react'

import ClassIcon from '../../class-icon'
import RoleIcon from '../../role-icon'

import classes, { classNames } from '../../../data/classes'

import STYLES from './overview.scss'

const BattleTag = ({ children, characters }) => {
  const guildCharacters = characters
    .sort((a, b) => (a.level > b.level || (a.level === b.level && a.name < b.name)) ? -1 : 1)
    .filter(c => c.guild === 'Distinctly Average' && c.realm === 'Silvermoon')
  const characterList = guildCharacters.length > 0
    ? `Guild characters:
${guildCharacters.map(c => `  ${c.level} - ${c.name} - ${classNames[c.class]}`).join('\n')}`
    : 'No characters in guild'
  return (
    <div className={STYLES.battletag} title={characterList}>{children}</div>
  )
}

const getClass = (name) => {
  return classes.find(c => c.safeName === name)
}
const getSpec = (wowClass, name) => {
  return wowClass && wowClass.specialisations.find(s => s.safeName === name)
}
const getRoleTag = (spec) => {
  return ['tank', 'healer', 'dps'].find(tag => spec && spec.tags && spec.tags.includes(tag))
}

const WarningIndicator = ({ severity, message }) => {
  const elements = []
  for (let i = 0; i < severity; i++) {
    elements.push(<div className={STYLES.severityIndicator} key={i} />)
  }
  return <div className={STYLES.warningIndicator} data-severity={severity} data-message={message} title={message}>
    {elements}
  </div>
}

const Selection = ({ num, class: wowClass, spec, comments, selected, onClick, warningMessage, warningSeverity }) => {
  const cleanComment = comments && comments.trim()
  const hasComment = cleanComment && cleanComment.length > 0

  return (
    <div className={STYLES.selection} title={cleanComment} data-selected={selected} onClick={onClick}>
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
      <div className={STYLES.indicators}>
        {hasComment && <div className={STYLES.commentIndicator} data-comment={cleanComment} />}
        {warningMessage && <WarningIndicator severity={warningSeverity} message={warningMessage} />}
      </div>
    </div>
  )
}

const choiceNumbers = {
  first: 1,
  second: 2,
  third: 3
}

const Selections = ({ characters, selections, onChoiceSelect }) => {
  return (
    <div className={STYLES.selections}>
      {selections.map(choice => {
        const realCharacters = characters.filter(c => c.realm)
          .sort((a, b) => (a.level > b.level || (a.level === b.level && a.name < b.name)) ? -1 : 1)
        const classCharacters = realCharacters.filter(c => c.class === choice.data.class.safeName)
        const maxLevelCharacters = classCharacters.filter(c => c.level === 110)
        const realmCharacters = maxLevelCharacters.filter(c => c.realm === 'Silvermoon')
        const guildCharacters = realmCharacters.filter(c => c.guild === 'Distinctly Average')

        let warning = null
        let severity = 0
        if (classCharacters.length === 0) {
          warning = 'Player has no characters of this class'
          severity = 3
        } else if (maxLevelCharacters.length === 0) {
          warning = `Player has no characters of this class at max level

Other ${choice.data.class.name} characters:
${classCharacters.map(c => `  ${c.level} - ${c.name} (${c.realm})`).join('\n')}`
          severity = 3
        } else if (realmCharacters.length === 0) {
          warning = `Player has no max level characters of this class on Silvermoon

Other ${choice.data.class.name} characters:
${classCharacters.map(c => `  ${c.level} - ${c.name} (${c.realm})`).join('\n')}`
          severity = 2
        } else if (guildCharacters.length === 0) {
          warning = `Player has no max level characters of this class in the guild

Other ${choice.data.class.name} characters:
${classCharacters.map(c => `  ${c.level} - ${c.name} (${c.realm})`).join('\n')}`
          severity = 1
        }

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
          }}
          warningMessage={warning}
          warningSeverity={severity} />
      })}
    </div>
  )
}

const UserSelections = ({ data, onChoiceSelect }) => {
  return (
    <div className={STYLES.userSelections}>
      <BattleTag characters={data.characters}>{data.battletag}</BattleTag>
      <Selections characters={data.characters} selections={data.selections} onChoiceSelect={onChoiceSelect} />
    </div>
  )
}

const mapData = (data) => {
  const { userSelectionData, userProfileData } = data
  return Object.entries(userSelectionData).map(([key, value]) => ({
    battletag: key,
    characters: (userProfileData[key] || {}).characters || [],
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

const getTags = (selections) => selections.map(selection => {
  return selection.data && selection.data.spec && selection.data.spec.tags
})

const flatten = (nestedItems) => nestedItems.reduce((flat, items) => flat.concat(items), [])

const sumBySelector = (items, selector) => items
  .reduce((sums, item) => ({ ...sums, [selector(item)]: (sums[selector(item)] || 0) + 1 }), {})

const sumTags = (tags) => sumBySelector(tags, tag => tag)

const sumSelectionTags = (selections) => sumTags(flatten(getTags(selections)))

const getClasses = (selections) => selections
  .map(selection => selection.data && selection.data.class)

const sumClasses = (classes) => sumBySelector(classes, c => c.safeName)

const sumSelectionClasses = (selections) => sumClasses(flatten(getClasses(selections)))

const mapToArray = (map) => Object.entries(map).map(([key, value]) => ({ key, value }))

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

const SummaryRow = ({ title, values }) => {
  return (
    <div className={STYLES.summaryRow}>
      <div className={STYLES.summaryRowTitle}>
        {title}
      </div>
      <div className={STYLES.summaryRowTags}>
        {values.map(t => <SummaryRowTag key={t.name} name={t.name} value={t.count} />)}
      </div>
    </div>
  )
}

const Summary = ({ title, classes, tags }) => {
  return (
    <div className={STYLES.summary}>
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
          .map(i => ({ name: classNames[i.key], count: i.value }))
          .sort((a, b) => a.name < b.name ? -1 : 1)} />
    </div>
  )
}

class OverviewView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      overviewData: mapData(props.viewData.overview)
    }
    this.selectChoice = this.selectChoice.bind(this)
  }

  selectChoice (battletag, choice) {
    const clonedData = JSON.parse(JSON.stringify(this.state.overviewData))

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
      overviewData: clonedData
    })
  }

  render () {
    const { overviewData } = this.state

    const selectionsDisplay = overviewData.map(data => {
      return <UserSelections
        key={data.battletag}
        {...{ data }}
        onChoiceSelect={(choice) => this.selectChoice(data.battletag, choice)} />
    })

    const allSelections = overviewData
      .reduce((allSelections, user) => allSelections.concat(user.selections), [])
    const selectedSelections = allSelections
      .filter(s => s.selected)

    const summedTags = sumSelectionTags(allSelections)
    const summedSelectedTags = sumSelectionTags(selectedSelections)

    const summedClasses = sumSelectionClasses(allSelections)
    const summedSelectedClasses = sumSelectionClasses(selectedSelections)

    const summary = <Summary title='Total summary' classes={summedClasses} tags={summedTags} />
    const selectedSummary = <Summary title='Selected summary' classes={summedSelectedClasses} tags={summedSelectedTags} />

    return <div className={STYLES.overview}>

      <div className={STYLES.summaryContainer}>
        {summary}
        {selectedSummary}
      </div>

      <div className={STYLES.selectionsContainer}>
        <div className={STYLES.selectionsHeader}>Player Selections ({overviewData.length})</div>
        <div className={STYLES.selectionsBlurb}>Click on a player's chosen class to select it and update the summary above</div>
        {selectionsDisplay}
      </div>

    </div>
  }
}

export default OverviewView
