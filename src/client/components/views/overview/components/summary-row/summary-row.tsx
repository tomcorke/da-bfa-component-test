import * as React from "react";

import SummaryValue from "../summary-value";

import * as STYLES from "./summary-row.scss";

interface SummaryRowValueData {
  name: string;
  count: number;
}

interface SummaryRowProps {
  title: string;
  values: SummaryRowValueData[];
}

const SummaryRow = ({ title, values }: SummaryRowProps) => {
  return (
    <div className={STYLES.summaryRow}>
      <div className={STYLES.summaryRowTitle}>{title}</div>
      <div className={STYLES.summaryRowTags}>
        {values.map(t => (
          <SummaryValue key={t.name} name={t.name} value={t.count} />
        ))}
      </div>
    </div>
  );
};

export default SummaryRow;
