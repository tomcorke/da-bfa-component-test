import * as React from "react";

import { WowClassSafeName } from "../../../types/classes";

import * as STYLES from "./class-icon.scss";

interface ClassIconProps {
  wowClass: WowClassSafeName;
}

const ClassIcon = ({ wowClass }: ClassIconProps) => {
  return <div className={STYLES.classIcon} data-class={wowClass} />;
};

export default ClassIcon;
