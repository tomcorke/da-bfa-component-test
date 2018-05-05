import React from 'react'

import ClassSelect from '../class-select'
import CommentsBox from '../comments-box'

import STYLES from './class-select-wrapper.scss'

const ClassSelectWrapper = ({ name, data = {}, description, children, profile, onChange }) => {
  const { selected, comments } = data

  const onClassChange = (value) => onChange(name, 'selected', value)
  const onCommentsChange = (value) => onChange(name, 'comments', value)

  let selectionWarning = null
  if (selected && selected.class) {
    console.log(selected)
    const selectedClass = selected.class
    const selectedClassMaxLevelCharacters = profile.characters
      .filter(c => c.class === selectedClass)
      .filter(c => c.level === 110)
    if (selectedClassMaxLevelCharacters.length === 0) {
      selectionWarning = <p className={STYLES.selectionWarning}>
        You do not currently have a character of this class at max level in the guild. If you wish to play this class it is your responsibility to ensure that it is ready to go for Battle for Azeroth and that you know what you're doing!
      </p>
    }
  }

  return (
    <div className={STYLES.classSelectWrapper}>
      <div className={STYLES.description}>
        {description}
      </div>
      <div className={STYLES.elements}>
        <ClassSelect onChange={onClassChange} value={selected} />
        <CommentsBox onChange={onCommentsChange} value={comments} />
      </div>
      {selectionWarning}
    </div>
  )
}

export default ClassSelectWrapper
