import * as React from 'react'

import * as STYLES from './section.scss'

interface SectionProps {
  children?: any
  type: string
}

const Section = ({ children, type }: SectionProps) => (
  <div className={`${STYLES.section} ${STYLES[`section__${type}`]}`}>
    <div className={STYLES.container}>
      {children}
    </div>
  </div>
)

export default Section
