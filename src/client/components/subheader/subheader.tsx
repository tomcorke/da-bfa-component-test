import * as React from "react";

import * as STYLES from "./subheader.scss";

interface SubHeaderProps {
  children?: any;
}

const SubHeader = ({ children }: SubHeaderProps) => {
  return <div className={STYLES.subHeader}>{children}</div>;
};

export default SubHeader;
