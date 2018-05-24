import * as React from 'react'
import LoginButton from '../login-button'

import * as STYLES from './header.scss'

interface HeaderProps {
  children?: any
  isLoggedIn: boolean
  battletag?: string
}

const Header = ({ children, isLoggedIn, battletag }: HeaderProps) => {
  const userDisplay = isLoggedIn
    ? <div className={STYLES.loggedIn}>
      <div className={STYLES.loggedInAs}>
        Logged in as {battletag}
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
