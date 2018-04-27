import React from 'react'

import STYLES from './button.scss'

const ButtonWrapper = ({ children, onClick, href, type }) => {
  const className = `${STYLES.wrapper} ${STYLES[`wrapper__${type}`]}`
  if (href) {
    return <a href={href} className={className}>{children}</a>
  } else {
    return <div onClick={onClick} className={className}>{children}</div>
  }
}

const Button = ({ text, onClick, href, type, highlight }) => {
  const buttonClasses = `${STYLES.button} ${highlight && STYLES.highlight}`
  return (
    <ButtonWrapper {...{ onClick, href, type }}>
      <div className={buttonClasses}>
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
