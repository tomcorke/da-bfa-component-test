import * as React from "react";

import { PLAYER_SELECTION_CHOICES } from "../../../../../../types/api";
import PlayerSelection from "../player-selection";

import * as STYLES from "./player-selections.scss";

interface PlayerSelectionsProps {
  battletag: string;
}

const PlayerSelections = ({ battletag }: PlayerSelectionsProps) => {
  return (
    <div className={STYLES.playerSelections}>
      {PLAYER_SELECTION_CHOICES.map(choice => (
        <PlayerSelection key={choice} battletag={battletag} choice={choice} />
      ))}
    </div>
  );
};

export default PlayerSelections;
