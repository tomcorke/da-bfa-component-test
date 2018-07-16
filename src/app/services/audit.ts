import * as winston from 'winston'
import * as rotateFileTransport from 'winston-daily-rotate-file'

interface AuditUserFlags {
  admin?: boolean
  superAdmin?: boolean
}

interface AuditUser {
  id: string
  name: string
  flags: AuditUserFlags
}

interface AuditLogEntry {
  timestamp: number
  user?: AuditUser
  message: string
  data?: object
}

const AUDIT_LOG_FILE = 'audit.log'
const AUDIT_LOG_PATH = `${__dirname}/logs/`

const auditLog = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new rotateFileTransport({
      filename: AUDIT_LOG_FILE,
      dirname: AUDIT_LOG_PATH,
      datePattern: '',
      maxSize: '10MB'
    })
  ]
})

export const log = (user?: AuditUser, message: string = '', data?: object) => {
  if (message.length === 0) return
  const logData = {
    timestamp: new Date().getTime(),
    user,
    message,
    data
  }
  auditLog.log('info', JSON.stringify(message))
}