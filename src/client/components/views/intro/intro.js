import React from 'react'

import MainPretext from '../../main-pretext'
import NonGuild from './components/non-guild'
import LoginPrompt from './components/login-prompt'

import STYLES from './intro.scss'

const IntroView = ({
  isLoggedIn,
  hasCharactersInGuild
}) => {
  if (isLoggedIn && hasCharactersInGuild) {
    return null
  }

  const IntroBody = isLoggedIn
    ? NonGuild
    : LoginPrompt

  return (
    <div className={STYLES.introView}>
      <MainPretext />
      <IntroBody />
    </div>
  )
}

export default IntroView
