import React from 'react'

import STYLES from './section.scss'

const Section = ({ children, type, key }) => (
  <div className={`${STYLES.section} ${STYLES[`section__${type}`]}`}>
    <div className={STYLES.container}>
      {children}
    </div>
  </div>
)

export default Section
