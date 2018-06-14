import { action } from 'typesafe-actions'

let fadeTimeout: number
let hideTimeout: number

export const FEEDBACK_MESSAGE_SHOW = 'FEEDBACK_MESSAGE_SHOW'
export const FEEDBACK_MESSAGE_FADEOUT = 'FEEDBACK_MESSAGE_FADEOUT'
export const FEEDBACK_MESSAGE_HIDE = 'FEEDBACK_MESSAGE_HIDE'

export type FeedbackMessageStyle = 'info' | 'success' | 'warning'

const _showFeedbackMessage = (message: string, style: FeedbackMessageStyle = 'info') => action(
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

export const show = (message: string, style?: FeedbackMessageStyle) => {
  return dispatch => {
    clearTimeout(fadeTimeout)
    clearTimeout(hideTimeout)
    dispatch(_showFeedbackMessage(message, style))
    fadeTimeout = window.setTimeout(() => {
      dispatch(_fadeOutFeedbackMessage())
    }, 1000)
    hideTimeout = window.setTimeout(() => {
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
