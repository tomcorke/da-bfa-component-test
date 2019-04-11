import * as React from 'react'

import { APISummarySelection } from '../../../../types/api'
import { WowRoleTag, WowTag } from '../../../../types/classes'
import ClassIcon from '../../class-icon'
import RoleIcon from '../../role-icon'

import * as STYLES from './summary.scss'

const ROLES: WowRoleTag[] = ['tank', 'healer', 'dps']
const getRoleTag: (tags: WowTag[]) => WowRoleTag | undefined = (tags) => {
  return ROLES.find(tag => tags && tags.includes(tag)) || undefined
}

interface SummaryItemProps {
  selection: APISummarySelection
}

const SummaryItem = ({ selection }: SummaryItemProps) => {
  const roleTag = getRoleTag(selection.tags)
  return (
    <div className={STYLES.summaryItem}>
      <ClassIcon wowClass={selection.class} />
      <RoleIcon role={roleTag} />
      <div className={STYLES.player}>{selection.playerName}</div>
    </div>
  )
}

interface SummaryColumnProps {
  title: string
  selections: APISummarySelection[]
}

const SummaryColumn = ({ title, selections }: SummaryColumnProps) => {
  return (
    <div className={STYLES.summaryColumn}>
      <div className={STYLES.summaryColumnTitle}>{title}</div>
      {selections.map(selection => <SummaryItem key={`${selection.playerName}_${selection.choice}`} selection={selection} />)}
    </div>
  )
}

interface SummaryDisplayProps {
  title: string
  selections: APISummarySelection[]
}

const SummaryDisplay = ({ title, selections }: SummaryDisplayProps) => {
  return (
    <div className={STYLES.summaryDisplay}>
      <div className={STYLES.summaryTitle}>{title}</div>
      <div className={STYLES.summaryColumns}>
        <SummaryColumn title='Tanks' selections={selections.filter(s => s.tags.includes('tank'))} />
        <SummaryColumn title='Healers' selections={selections.filter(s => s.tags.includes('healer'))} />
        <SummaryColumn title='Melee' selections={selections.filter(s => s.tags.includes('dps') && s.tags.includes('melee'))} />
        <SummaryColumn title='Ranged' selections={selections.filter(s => s.tags.includes('dps') && s.tags.includes('ranged'))} />
      </div>
    </div>
  )
}

interface SummaryViewProps {
  selections: APISummarySelection[]
}

const SummaryView = ({
  selections
}: SummaryViewProps) => {

  const mainSelections = selections.filter(s => s.choice === 'main')

  return (
    <div className={STYLES.summaryView}>

      <SummaryDisplay title='Mains' selections={mainSelections} />
    </div>
  )
}

export default SummaryView
