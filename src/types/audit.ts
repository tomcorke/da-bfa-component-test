export const AUDIT_LOG_EVENT_LOCK = 'lock'
export const AUDIT_LOG_EVENT_UNLOCK = 'unlock'
export const AUDIT_LOG_EVENT_SAVE_DATA = 'save'
export const AUDIT_LOG_EVENT_UPDATE_DATA = 'update'
export const AUDIT_LOG_EVENT_LOGIN = 'login'
export const AUDIT_LOG_EVENT_SERVER = 'server'
export const AUDIT_LOG_EVENT_CONFIRM = 'confirm'

export type AuditLogEvent =
  | typeof AUDIT_LOG_EVENT_LOCK
  | typeof AUDIT_LOG_EVENT_UNLOCK
  | typeof AUDIT_LOG_EVENT_SAVE_DATA
  | typeof AUDIT_LOG_EVENT_UPDATE_DATA
  | typeof AUDIT_LOG_EVENT_LOGIN
  | typeof AUDIT_LOG_EVENT_SERVER
  | typeof AUDIT_LOG_EVENT_CONFIRM

export const AUDIT_LOG_EVENTS: AuditLogEvent[] = [
  AUDIT_LOG_EVENT_LOCK,
  AUDIT_LOG_EVENT_UNLOCK,
  AUDIT_LOG_EVENT_SAVE_DATA,
  AUDIT_LOG_EVENT_UPDATE_DATA,
  AUDIT_LOG_EVENT_LOGIN,
  AUDIT_LOG_EVENT_SERVER,
  AUDIT_LOG_EVENT_CONFIRM
]

export interface AuditUserFlags {
  admin?: boolean
  superAdmin?: boolean
}

export interface AuditUser {
  id: string
  name?: string
  flags?: AuditUserFlags
}

export interface AuditLogEntry {
  timestamp: Date
  user?: AuditUser
  message: string
  data?: object
  event: AuditLogEvent
}
