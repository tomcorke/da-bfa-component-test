import React from 'react'

import STYLES from './feedback-message.scss'

const FeedbackMessage = ({ message, fade, hide, style, onClick }) => {
  if (!message || hide) {
    return null
  }

  const classNames = `${STYLES.feedbackMessage} ${fade && STYLES.fadeout} ${STYLES[`feedbackMessage__${style}`]}`

  return (
    <div onClick={onClick} className={classNames}>{message}</div>
  )
}

export default FeedbackMessage
