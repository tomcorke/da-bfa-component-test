import * as React from "react";

import * as STYLES from "./summary-value.scss";

interface SummaryValueProps {
  name: string;
  value: number;
}

const SummaryValue = ({ name, value }: SummaryValueProps) => {
  return (
    <div className={STYLES.summaryValue} data-has-value={value > 0}>
      <div className={STYLES.name}>{name}</div>
      <div className={STYLES.value}>{value}</div>
    </div>
  );
};

export default SummaryValue;
