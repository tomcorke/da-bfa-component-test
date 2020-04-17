import * as React from "react";

import * as STYLES from "./class-icon.scss";
import { WowClassSafeName } from "../../../types/classes";

interface ClassIconProps {
  wowClass: WowClassSafeName;
}

const ClassIcon = ({ wowClass }: ClassIconProps) => {
  return <div className={STYLES.classIcon} data-class={wowClass} />;
};

export default ClassIcon;
