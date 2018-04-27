import React from 'react'

import STYLES from './header.scss'

const Header = ({ children, userData, onLoginClick }) => {

  const userDisplay = userData
    ? <div>
        <pre>{JSON.stringify(userData)}</pre>
        <a href='logout'>Logout</a>
      </div>
    : <div onClick={onLoginClick}>&lt;Login&gt;</div>

  return (
    <div className={STYLES.header}>
      <div className={STYLES.titles}>
        {children}
      </div>
      <div className={STYLES.menu}>
        {userDisplay}
      </div>
    </div>
  )
}

export default Header
