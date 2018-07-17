import { connect } from 'react-redux'

import AuditView from './audit'
import { ApplicationState } from '../../../redux/reducers'

const ConnectedAuditView = connect(
  (state: ApplicationState) => ({
    auditLogEntries: state.audit.entries
  })
)(AuditView)

export default ConnectedAuditView
