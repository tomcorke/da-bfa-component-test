import React from 'react'

import STYLES from './button.scss'

const ButtonWrapper = ({ children, onClick, href }) => {
  if (href) {
    return <a href={href}>{children}</a>
  } else {
    return <div onClick={onClick}>{children}</div>
  }
}

const Button = ({ text, onClick, href }) => {
  return (
    <ButtonWrapper {...{ onClick, href }}>
      <div className={STYLES.button}>
        <div className={STYLES.buttonOuter}>
          <div className={STYLES.buttonInner}>
            <div className={STYLES.label}>
              {text}
            </div>
          </div>
        </div>
      </div>
    </ButtonWrapper>
  )
}

export default Button
