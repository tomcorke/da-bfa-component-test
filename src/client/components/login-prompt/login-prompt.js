import React from 'react'
import Panel from '../panel'

import STYLES from './login-prompt.scss'

const LoginPrompt = () => {
  return (
    <div className={STYLES.loginPrompt}>
      <Panel>
        <div>To use this site you must log in with Battle.net!</div>
        <div className={STYLES.spacer} />
        <div>This allows us to save your selections, associate them with guild members, and stops people from taking the piss with made-up names in some kind of informal spreadsheet. Let's be honest, you would.</div>
      </Panel>
    </div>
  )
}

export default LoginPrompt
