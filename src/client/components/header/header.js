import React from 'react'

import STYLES from './header.scss'

const Header = ({ children, userData, onLoginClick }) => {

  const userDisplay = userData
    ? <div className={STYLES.loggedIn}>
        <div className={STYLES.loggedInAs}>
          Logged in as {userData.battletag}
        </div>
        <a className={`${STYLES.logoutButton}`} href='logout'>Logout</a>
      </div>
    : <div className={`${STYLES.loginButton}`} onClick={onLoginClick}>Login</div>

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
