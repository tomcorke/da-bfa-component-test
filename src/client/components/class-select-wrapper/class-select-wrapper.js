import React from 'react'

import STYLES from './class-select-wrapper.scss'

const ClassSelectWrapper = ({ description, children }) => {
  return (
    <div className={STYLES.classSelectWrapper}>
      <div className={STYLES.description}>
        {description}
      </div>
      <div className={STYLES.elements}>
        {children}
      </div>
    </div>
  )
}

export default ClassSelectWrapper
