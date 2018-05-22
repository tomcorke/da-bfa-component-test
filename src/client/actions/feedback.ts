import { action } from 'typesafe-actions'

let fadeTimeout = null
let hideTimeout = null

export const FEEDBACK_MESSAGE_SHOW = 'FEEDBACK_MESSAGE_SHOW'
export const FEEDBACK_MESSAGE_FADEOUT = 'FEEDBACK_MESSAGE_FADEOUT'
export const FEEDBACK_MESSAGE_HIDE = 'FEEDBACK_MESSAGE_HIDE'

const _showFeedbackMessage = (message: string, style: string = 'info') => action(
  FEEDBACK_MESSAGE_SHOW,
  {
    message,
    style
  }
)

const _fadeOutFeedbackMessage = () => action(FEEDBACK_MESSAGE_FADEOUT)

const _hideFeedbackMessage = () => {
  clearTimeout(fadeTimeout)
  clearTimeout(hideTimeout)
  return action(FEEDBACK_MESSAGE_HIDE)
}

export const show = (message: string, style?: string) => {
  return dispatch => {
    clearTimeout(fadeTimeout)
    clearTimeout(hideTimeout)
    dispatch(_showFeedbackMessage(message, style))
    fadeTimeout = setTimeout(() => {
      dispatch(_fadeOutFeedbackMessage())
    }, 1000)
    hideTimeout = setTimeout(() => {
      dispatch(_hideFeedbackMessage())
    }, 2000)
  }
}

export const hide = () => {
  return _hideFeedbackMessage()
}

export type FeedbackAction = ReturnType<
  | typeof _showFeedbackMessage
  | typeof _fadeOutFeedbackMessage
  | typeof _hideFeedbackMessage
>