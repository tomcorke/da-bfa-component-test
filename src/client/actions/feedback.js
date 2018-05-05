let fadeTimeout = null
let hideTimeout = null

export const FEEDBACK_MESSAGE_SHOW = 'FEEDBACK_MESSAGE_SHOW'
export const FEEDBACK_MESSAGE_FADEOUT = 'FEEDBACK_MESSAGE_FADEOUT'
export const FEEDBACK_MESSAGE_HIDE = 'FEEDBACK_MESSAGE_HIDE'

const showFeedbackMessage = (message) => ({
  type: FEEDBACK_MESSAGE_SHOW,
  message
})

const fadeOutFeedbackMessage = () => ({
  type: FEEDBACK_MESSAGE_FADEOUT
})

const hideFeedbackMessage = () => {
  clearTimeout(fadeTimeout)
  clearTimeout(hideTimeout)
  return {
    type: FEEDBACK_MESSAGE_HIDE
  }
}

export const show = (message) => {
  console.log('show', message)
  return dispatch => {
    clearTimeout(fadeTimeout)
    clearTimeout(hideTimeout)
    dispatch(showFeedbackMessage(message))
    fadeTimeout = setTimeout(() => {
      dispatch(fadeOutFeedbackMessage())
    }, 1000)
    hideTimeout = setTimeout(() => {
      dispatch(hideFeedbackMessage())
    }, 2000)
  }
}

export const hide = () => {
  return hideFeedbackMessage()
}
