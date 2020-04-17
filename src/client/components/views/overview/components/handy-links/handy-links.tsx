import * as React from "react";

import SmallButton from "../../../../small-button";

import * as STYLES from "./handy-links.scss";

interface HandyLinksProps {
  onSelectAllClick: () => any;
  onSelectLockedClick: () => any;
  onDeselectAllClick: () => any;
}

const HandyLinks = ({
  onSelectAllClick,
  onSelectLockedClick,
  onDeselectAllClick
}: HandyLinksProps) => {
  return (
    <ul className={STYLES.handyLinks}>
      <li className={STYLES.link}>
        <SmallButton onClick={onSelectAllClick}>
          Select all first/second picks
        </SmallButton>
      </li>
      <li className={STYLES.link}>
        <SmallButton onClick={onSelectLockedClick}>
          Select locked picks
        </SmallButton>
      </li>
      <li className={STYLES.link}>
        <SmallButton onClick={onDeselectAllClick}>Deselect all</SmallButton>
      </li>
    </ul>
  );
};

export default HandyLinks;
