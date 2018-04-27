import React from 'react'

import STYLES from './subheader.scss'

const SubHeader = ({ children }) => {
  return (
    <div className={STYLES.subHeader}>
      {children}
    </div>
  )
}

export default SubHeader
