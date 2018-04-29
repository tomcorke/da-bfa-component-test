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

const Selection = ({ num, class: wowClass, spec, comments }) => {
  return (
    <div className={STYLES.selection} title={comments}>
      <div className={STYLES.choiceNumber}>
        {num}
      </div>
      <div className={STYLES.class}>
        <ClassIcon wowClass={wowClass.safeName} />
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

const Selections = ({ selections }) => (
  <div className={STYLES.selections}>
    {selections.map(choice => {
      return <Selection key={choice.choice} num={choiceNumbers[choice.choice]} {...choice.data} />
    })}
  </div>
)

const UserSelections = ({ data }) => {
  return (
    <div className={STYLES.userSelections}>
      <BattleTag>{data.battletag}</BattleTag>
      <Selections selections={data.selections} />
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

const OverviewView = ({
  viewData
}) => {
  const { overview } = viewData

  const mappedData = mapData(overview)
  console.log(mappedData)

  const selections = mappedData.map(data => {
    return <UserSelections key={data.battletag} {...{ data }} />
  })

  return <div className={STYLES.overview}>
    {selections}
  </div>
}

export default OverviewView
