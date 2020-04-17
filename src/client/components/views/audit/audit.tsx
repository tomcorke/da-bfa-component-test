import * as React from "react";

import { AuditLogEntry } from "../../../../types/audit";

import * as STYLES from "./audit.scss";

const getEventName = (entry: AuditLogEntry): string => {
  if (entry.event === "server") {
    if (entry.message.startsWith("Server started ")) return "serverStart";
  }
  return entry.event;
};

type AuditViewProps = {
  auditLogEntries: AuditLogEntry[];
};

const AuditView = ({ auditLogEntries }: AuditViewProps) => {
  return (
    <div className={STYLES.auditView}>
      {auditLogEntries.map(entry => {
        const eventName = getEventName(entry);

        const userClasses = [STYLES.user];
        if (entry.user) {
          if (entry.user.flags) {
            if (entry.user.flags.admin) userClasses.push(STYLES.admin);
            if (entry.user.flags.superAdmin)
              userClasses.push(STYLES.superAdmin);
          }
        }

        return (
          <div
            className={[STYLES.entry, STYLES[`event__${eventName}`]].join(" ")}
          >
            <div className={STYLES.timestamp}>
              {entry.timestamp.toLocaleString()}
            </div>
            <div className={userClasses.join(" ")}>
              {entry.user ? entry.user.name || entry.user.id : null}
            </div>
            <div
              className={STYLES.message}
              title={
                entry.data ? JSON.stringify(entry.data, null, 2) : undefined
              }
            >
              {entry.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuditView;
