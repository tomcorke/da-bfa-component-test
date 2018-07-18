import { action } from 'typesafe-actions'
import { AuditLogEntry } from '../../../types/audit'
import { ApplicationState } from '../reducers'
import * as feedbackActions from './feedback'
import config from '../../config'
import { APIAuditData } from '../../../types/api'

export const GET_AUDIT_LOG_START = 'GET_AUDIT_LOG_START'
export const GET_AUDIT_LOG_SUCCESS = 'GET_AUDIT_LOG_SUCCESS'
export const GET_AUDIT_LOG_FAIL = 'GET_AUDIT_LOG_FAIL'

interface GetOverviewDataOptions {
  onSuccess?: () => any
  noFeedback?: boolean
}

const _getAuditLogStart = () => action(GET_AUDIT_LOG_START)

const _getAuditLogSuccess = (data: APIAuditData) => action(GET_AUDIT_LOG_SUCCESS, data)

const _getAuditLogFail = (error: Error) => action(GET_AUDIT_LOG_FAIL, error)

export const getAuditLog = (opts: GetOverviewDataOptions = {}) => {
  return async (dispatch, getState: () => ApplicationState) => {

    if (!opts.noFeedback) dispatch(feedbackActions.show('Getting audit data'))
    dispatch(_getAuditLogStart())

    try {
      const response = await window.fetch(config.getAuditDataEndpoint, { credentials: 'same-origin' })

      if (response.status !== 200) {
        throw Error('Could not get overview view data')
      }

      const dataString = await response.text()
      const data = JSON.parse(dataString, (key: any, value: any) => {
        if (key === 'timestamp') return new Date(value)
        return value
      }) as APIAuditData

      if (!opts.noFeedback) dispatch(feedbackActions.hide())
      dispatch(_getAuditLogSuccess(data))

      if (opts.onSuccess) opts.onSuccess()

    } catch (err) {
      dispatch(_getAuditLogFail(err))
      if (!opts.noFeedback) dispatch(feedbackActions.show('Error getting audit data.', 'warning'))
    }

  }
}

export type AuditAction = ReturnType<
  | typeof _getAuditLogStart
  | typeof _getAuditLogSuccess
  | typeof _getAuditLogFail
>
