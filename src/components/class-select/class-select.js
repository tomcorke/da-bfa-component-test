import React from 'react'
import classData from '../../data/classes'

import STYLES from './class-select.scss'

const ClassSelect = ({ selected, onChange }) => {

  const classes = classData
    .map(c => ({
      name: c.name,
      safeName: c.name.toLowerCase().replace(/\s/g, '')
    }))

  const options = classes
    .map(c =>
      <option
        selected={c.safeName==selected}
        value={c.safeName}>
        {c.name}
      </option>
    )

  return (
    <div className={STYLES.classSelect}>
      <select {...{['data-selected']: selected}} onChange={(e) => onChange(e.target.value)}>
        <option>Select a class</option>
        {options}
      </select>
    </div>
  )
}

export default ClassSelect