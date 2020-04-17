import * as React from "react";

import { PLAYER_SELECTION_CHOICES } from "../../../../../../types/api";
import ClassSelectWrapper from "../class-select-wrapper";
import ConfirmPromptButton from "../confirm-prompt-button";
import ConfirmedThanks from "../confirmed-thanks";
import SaveButton from "../save-button";

import * as STYLES from "./user-selections.scss";

const getBlurb = (name: string) => {
  return {
    first: "Main choice:",
    second: "Alt choice:",
    third: "Backup choice:"
  }[name];
};

const createClassSelectWrapper = (name: string) => {
  return (
    <ClassSelectWrapper key={name} name={name} description={getBlurb(name)} />
  );
};

interface UserSelectionsProps {
  locked: boolean;
  confirmed: boolean;
}

const UserSelections = ({ locked, confirmed }: UserSelectionsProps) => {
  return (
    <div className={STYLES.userSelections}>
      {PLAYER_SELECTION_CHOICES.map(createClassSelectWrapper)}
      {locked ? (
        confirmed ? (
          <ConfirmedThanks />
        ) : (
          <ConfirmPromptButton key="confirm-button" />
        )
      ) : (
        <SaveButton key="save-button" />
      )}
    </div>
  );
};

export default UserSelections;
