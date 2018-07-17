import { Reducer } from 'redux'
import {
  GET_AUDIT_LOG_START,
  GET_AUDIT_LOG_SUCCESS,
  GET_AUDIT_LOG_FAIL,
  AuditAction
} from '../actions/audit'
import { AuditLogEntry } from '../../../types/audit'
import { APIAuditData } from '../../../types/api'

export interface AuditState {
  entries: AuditLogEntry[]
  gettingAuditLog: boolean
}

const initialState: AuditState = {
  entries: [],
  gettingAuditLog: false
}

const handleGetAuditLogStart = (state: AuditState): AuditState => {
  return {
    ...state,
    gettingAuditLog: true
  }
}

const handleGetAuditLogSuccess = (state: AuditState, data: APIAuditData): AuditState => {
  return {
    ...state,
    gettingAuditLog: false,
    entries: data.entries
  }
}

const handleGetAuditLogFail = (state: AuditState): AuditState => {
  return {
    ...state,
    gettingAuditLog: false
  }
}

const AuditReducer: Reducer<AuditState, AuditAction> = (state: AuditState = initialState, action: AuditAction) => {
  switch (action.type) {
    case GET_AUDIT_LOG_START:
      return handleGetAuditLogStart(state)
    case GET_AUDIT_LOG_SUCCESS:
      return handleGetAuditLogSuccess(state, action.payload)
    case GET_AUDIT_LOG_FAIL:
      return handleGetAuditLogFail(state)
    default:
      return state
  }
}

export default AuditReducer
