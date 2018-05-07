import React from 'react'
import classes from '../../../../../data/classes'

import STYLES from './class-select.scss'

const ClassSelect = ({ selectedClass, selectedSpec, onChange }) => {
  const classOptions = classes
    .map(c =>
      <option
        key={c.safeName}
        value={c.safeName}>
        {c.name}
      </option>
    )

  let specOptions = []
  const selectedClassData = classes.find(c => c.safeName === selectedClass)
  if (selectedClassData) {
    specOptions = selectedClassData.specialisations
      .map(s =>
        <option
          key={s.safeName}
          value={s.safeName}>
          {s.name}
        </option>
      )
  }

  const selectedSpecData = selectedClassData &&
    selectedClassData.specialisations.find(s => s.safeName === selectedSpec)

  const onClassChange = (newClass) => {
    onChange({
      class: newClass,
      spec: null
    })
  }

  const onSpecChange = (newSpec) => {
    onChange({
      class: selectedClass,
      spec: newSpec
    })
  }

  return (
    <div
      className={STYLES.classSpecSelect}
      {...{'data-selected': selectedClass}}>
      <select
        {...{'data-required': !selectedClassData}}
        className={STYLES.classSelect}
        onChange={(e) => onClassChange(e.target.value)}
        value={selectedClass || ''}>
        <option value=''>Select a class</option>
        {classOptions}
      </select>
      <select
        {...{'data-required': !selectedSpecData}}
        disabled={!selectedClassData}
        className={STYLES.specSelect}
        onChange={(e) => onSpecChange(e.target.value)}
        value={selectedSpec || ''}>
        <option value=''>Select a spec</option>
        {specOptions}
      </select>
    </div>
  )
}

export default ClassSelect
