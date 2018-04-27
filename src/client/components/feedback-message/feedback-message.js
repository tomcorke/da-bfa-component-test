import React from 'react'

import STYLES from './feedback-message.scss'

const FeedbackMessage = ({ message, fadeout, onClick }) => {
  const classNames = `${STYLES.feedbackMessage} ${fadeout && STYLES.fadeout}`
  return (
    <div onClick={onClick} className={classNames}>{message}</div>
  )
}

export default FeedbackMessage
