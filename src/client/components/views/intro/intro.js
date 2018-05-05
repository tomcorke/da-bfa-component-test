import React from 'react'

import LoginPrompt from './components/login-prompt'

import STYLES from './intro.scss'

const IntroView = () => {
  return (
    <div className={STYLES.introView}>
      <LoginPrompt />
    </div>
  )
}

export default IntroView
