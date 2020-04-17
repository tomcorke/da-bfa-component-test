import * as React from "react";

import * as STYLES from "./warning-indicator.scss";

const getRepeats = severity => {
  if (severity <= 3) {
    return severity;
  }
  return 1;
};

interface WarningIndicatorProps {
  severity: number;
  message: string;
}

const WarningIndicator = ({ severity, message }: WarningIndicatorProps) => {
  const elements: any[] = [];
  for (let i = 0; i < getRepeats(severity); i++) {
    elements.push(<div className={STYLES.severityIndicator} key={i} />);
  }
  return (
    <div
      className={STYLES.warningIndicator}
      data-severity={severity}
      data-message={message}
      title={message}
    >
      {elements}
    </div>
  );
};

export default WarningIndicator;
