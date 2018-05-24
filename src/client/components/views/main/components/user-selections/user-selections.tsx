import * as React from 'react'

import ClassSelectWrapper from '../class-select-wrapper'
import SaveButton from '../save-button'

import * as STYLES from './user-selections.scss'

const getBlurb = (name: string) => {
  return ({
    first: 'Main choice:',
    second: 'Alt choice:',
    third: 'Backup choice:'
  })[name]
}

const createClassSelectWrapper = (name: string) => {
  return (
    <ClassSelectWrapper
      key={name}
      name={name}
      description={getBlurb(name)} />
  )
}

const UserSelections = () => {
  return <div className={STYLES.userSelections}>
    {[
      createClassSelectWrapper('first'),
      createClassSelectWrapper('second'),
      createClassSelectWrapper('third')
    ]}
    <SaveButton key='save-button' />
  </div>
}

export default UserSelections
