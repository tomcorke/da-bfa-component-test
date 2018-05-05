import React from 'react'
import LoginButton from '../login-button'

import STYLES from './header.scss'

const Header = ({ children, userData }) => {
  const userDisplay = userData.isLoggedIn
    ? <div className={STYLES.loggedIn}>
      <div className={STYLES.loggedInAs}>
        Logged in as {userData.battletag}
      </div>
      <LoginButton type='logout' href='logout' text='Logout' />
    </div>
    : null

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
