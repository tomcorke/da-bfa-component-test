import React from 'react'

import ClassIcon from '../class-icon'

import STYLES from './wow-character.scss'

const WowCharacter = ({ character }) => {
  const { name, class: wowClass, level } = character
  return (
    <div className={STYLES.wowCharacter}>
      <div className={STYLES.classIcon}>
        <ClassIcon wowClass={wowClass} />
      </div>
      <div className={STYLES.level}>{level}</div>
      <div className={STYLES.name} data-class={wowClass}>{name}</div>
    </div>
  )
}

export default WowCharacter
