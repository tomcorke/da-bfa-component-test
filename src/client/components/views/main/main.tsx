import * as React from "react";

import MainPretext from "../../main-pretext";
import ClassDisplay from "./components/class-display";
import UserSelections from "./components/user-selections";
import ConfirmSelectionsPrompt from "./components/confirm-selections-prompt";

import * as STYLES from "./main.scss";

interface MainViewProps {
  showConfirmSelectionsPrompt: boolean;
}

const MainView = ({ showConfirmSelectionsPrompt }: MainViewProps) => (
  <div className={STYLES.mainView}>
    <MainPretext />
    <ClassDisplay />
    <UserSelections />
    {showConfirmSelectionsPrompt ? <ConfirmSelectionsPrompt /> : null}
  </div>
);

export default MainView;
