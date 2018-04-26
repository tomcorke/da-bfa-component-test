import React from 'react'

import STYLES from './section.scss'

const Section = ({ children, id, key }) => (
  <div className={`${STYLES.section} ${STYLES[`section__${id}`]}`}>
    <div className={STYLES.container}>
      {children}
    </div>
  </div>
)

export default Section
