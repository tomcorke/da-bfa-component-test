import * as winston from 'winston'
import * as rotateFileTransport from 'winston-daily-rotate-file'
import { AuditLogEvent, AuditUser } from '../../types/audit'

const AUDIT_LOG_FILE = 'audit.log'
const ERROR_LOG_FILE = 'error.log'
const LOG_PATH = `${__dirname}/../../../logs/`

const auditFileLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new rotateFileTransport({
      filename: AUDIT_LOG_FILE,
      dirname: LOG_PATH,
      datePattern: '',
      maxSize: '10MB',
      json: true
    })
  ]
})
const errorFileLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new rotateFileTransport({
      filename: ERROR_LOG_FILE,
      dirname: LOG_PATH,
      datePattern: '',
      maxSize: '10MB',
      json: true
    })
  ]
})
const consoleLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
})

export const auditLog = (event: AuditLogEvent, message: string, user?: AuditUser, data?: object) => {
  auditFileLogger.log('info', message, { event, user, data })
  consoleLogger.log('info', message, { user, data })
}

export const log = (message: string, user?: AuditUser, data?: object) => {
  consoleLogger.log('info', message, { user, data })
}

export const errorLog = (message: string, user?: AuditUser, data?: any) => {
  errorFileLogger.log('error', message, { user, data })
  consoleLogger.log('error', message, { user, data })
}
