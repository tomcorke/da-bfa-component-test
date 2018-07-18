import { connect } from 'react-redux'

import AuditView from './audit'
import { ApplicationState } from '../../../redux/reducers'

const ConnectedAuditView = connect(
  (state: ApplicationState) => ({
    auditLogEntries: state.audit.entries.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
  })
)(AuditView)

export default ConnectedAuditView
