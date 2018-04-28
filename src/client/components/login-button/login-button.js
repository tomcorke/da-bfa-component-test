import React from 'react'

import STYLES from './login-button.scss'

const LoginButton = ({ href, onClick, text, type, disabled }) => {
  const className = `${STYLES.loginButton} ${STYLES[`loginButton__${type}`]} ${disabled ? STYLES.disabled : ''}`

  if (disabled) {
    return <div className={className}>{text}</div>
  }

  if (href) {
    return <a href={href} className={className}>{text}</a>
  } else if (onClick) {
    return <div onClick={onClick} className={className}>{text}</div>
  } else {
    throw Error('href or onClick required')
  }
}

export default LoginButton
