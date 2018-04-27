import React from 'react'
import classData from '../../data/classes'

import STYLES from './class-select.scss'

const ClassSelect = ({ value = {}, onChange }) => {
  const classes = classData
    .map(c => ({
      name: c.name,
      safeName: c.name.toLowerCase().replace(/\s/g, ''),
      specs: c.specialisations.map(s => ({
        name: s.name,
        safeName: s.name.toLowerCase().replace(/\s/g, ''),
        roles: s.roles
      }))
    }))

  const classOptions = classes
    .map(c =>
      <option
        key={c.safeName}
        value={c.safeName}>
        {c.name}
      </option>
    )

  let specOptions = []
  const selectedClass = classes.find(c => c.safeName === value.class)
  if (selectedClass) {
    specOptions = selectedClass.specs
      .map(s =>
        <option
          key={s.safeName}
          value={s.safeName}>
          {s.name}
        </option>
      )
  }

  const selectedSpec = selectedClass && selectedClass.specs.find(s => s.safeName === value.spec)

  const onClassChange = (newClass) => {
    onChange({
      class: newClass
    })
  }

  const onSpecChange = (newSpec) => {
    onChange({
      ...value,
      spec: newSpec
    })
  }

  return (
    <div
      className={STYLES.classSpecSelect}
      {...{'data-selected': value.class}}>
      <select
        {...{'data-required': !selectedClass}}
        className={STYLES.classSelect}
        onChange={(e) => onClassChange(e.target.value)}
        value={value.class}>
        <option>Select a class</option>
        {classOptions}
      </select>
      <select
        {...{'data-required': !selectedSpec}}
        disabled={!selectedClass}
        className={STYLES.specSelect}
        onChange={(e) => onSpecChange(e.target.value)}
        value={value.spec}>
        <option>Select a spec</option>
        {specOptions}
      </select>
    </div>
  )
}

export default ClassSelect
