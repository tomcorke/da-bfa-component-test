import { connect } from "react-redux";

import { ApplicationState } from "../../../redux/reducers";

import AuditView from "./audit";

const ConnectedAuditView = connect((state: ApplicationState) => ({
  auditLogEntries: state.audit.entries.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1
  )
}))(AuditView);

export default ConnectedAuditView;
