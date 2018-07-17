import * as React from 'react'

import * as STYLES from './audit.scss'

import { AuditLogEntry } from '../../../../types/audit'

type AuditViewProps = {
  auditLogEntries: AuditLogEntry[]
}

const AuditView = ({
  auditLogEntries
}: AuditViewProps) => {

  return (
    <div className={STYLES.auditView}>
      {auditLogEntries.map(entry => <div>{entry.message}</div>)}
    </div>
  )
}

export default AuditView
