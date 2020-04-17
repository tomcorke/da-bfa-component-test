import * as React from "react";
import { APIPlayerCharacter } from "../../../../../../types/api";
import ClassIcon from "../../../../class-icon";

import * as STYLES from "./wow-character.scss";

interface WowCharacterProps {
  character: APIPlayerCharacter;
}

const WowCharacter = ({ character }: WowCharacterProps) => {
  const { name, class: wowClass, level } = character;
  return (
    <div className={STYLES.wowCharacter}>
      <div className={STYLES.classIcon}>
        <ClassIcon wowClass={wowClass} />
      </div>
      <div className={STYLES.level}>{level}</div>
      <div className={STYLES.name} data-class={wowClass}>
        {name}
      </div>
    </div>
  );
};

export default WowCharacter;
