import React from 'react'

import STYLES from './feedback-message.scss'

const FeedbackMessage = ({ message, fade, hide, onClick }) => {
  if (!message || hide) {
    return null
  }

  const classNames = `${STYLES.feedbackMessage} ${fade && STYLES.fadeout}`

  return (
    <div onClick={onClick} className={classNames}>{message}</div>
  )
}

export default FeedbackMessage
