import React from 'react'

import ClassSelect from '../class-select'
import CommentsBox from '../comments-box'

import STYLES from './class-select-wrapper.scss'

const ClassSelectWrapper = ({
  description,
  selectedClass,
  selectedSpec,
  comments,
  showSelectedClassWarning,
  onChange
}) => {
  const onClassChange = (value) => onChange('selected', value)
  const onCommentsChange = (value) => onChange('comments', value)

  let selectionWarning = null
  if (showSelectedClassWarning) {
    selectionWarning = <p className={STYLES.selectionWarning}>
      You do not currently have a character of this class at max level in the guild. If you wish to play this class it is your responsibility to ensure that it is ready to go for Battle for Azeroth and that you know what you're doing!
    </p>
  }

  return (
    <div className={STYLES.classSelectWrapper}>
      <div className={STYLES.description}>
        {description}
      </div>
      <div className={STYLES.elements}>
        <ClassSelect onChange={onClassChange} selectedClass={selectedClass} selectedSpec={selectedSpec} />
        <CommentsBox onChange={onCommentsChange} value={comments} />
      </div>
      {selectionWarning}
    </div>
  )
}

export default ClassSelectWrapper
