import * as React from 'react'
import classes, { classNames, specNames } from '../../../../../data/classes'

import * as STYLES from './class-select.scss'

interface ClassSelectProps {
  selectedClass?: string
  selectedSpec?: string
  onChange: (newValue: { class?: string, spec?: string | null }) => any
  isLocked?: boolean
}

const ClassSelect = ({ selectedClass, selectedSpec, onChange, isLocked }: ClassSelectProps) => {
  const classOptions = classes
    .map(c =>
      <option
        key={c.safeName}
        value={c.safeName}>
        {c.name}
      </option>
    )

  let specOptions: JSX.Element[] = []
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

  const rootClasses = [STYLES.classSpecSelect]
  if (isLocked) rootClasses.push(STYLES.classSpecSelect__locked)

  return (
    <div
      className={rootClasses.join(' ')}
      {...{ 'data-selected': selectedClass }}>

      {isLocked
        ? <input
            className={STYLES.classSelectReadOnly}
            value={classNames[selectedClass || '']}
            readOnly={true} />
        : <select
            {...{ 'data-required': !selectedClassData }}
            className={STYLES.classSelect}
            onChange={(e) => onClassChange(e.target.value)}
            value={selectedClass || ''}>
            <option value=''>Select a class</option>
            {classOptions}
          </select>
      }

      {isLocked
        ? <input
            className={STYLES.specSelectReadOnly}
            value={specNames[selectedSpec || '']}
            readOnly={true} />
        : <select
          {...{ 'data-required': !selectedSpecData }}
          disabled={!selectedClassData}
          className={STYLES.specSelect}
          onChange={(e) => onSpecChange(e.target.value)}
          value={selectedSpec || ''}>
          <option value=''>Select a spec</option>
          {specOptions}
        </select>
      }

    </div>
  )
}

export default ClassSelect
