import * as React from "react";

import MainPretext from "../../main-pretext";

import LoginPrompt from "./components/login-prompt";
import NonGuild from "./components/non-guild";
import * as STYLES from "./intro.scss";

type IntroViewProps = {
  isLoggedIn: boolean;
  hasCharactersInGuild: boolean;
};

const IntroView = ({ isLoggedIn, hasCharactersInGuild }: IntroViewProps) => {
  if (isLoggedIn && hasCharactersInGuild) {
    return null;
  }

  const IntroBody = isLoggedIn ? NonGuild : LoginPrompt;

  return (
    <div className={STYLES.introView}>
      <MainPretext />
      <IntroBody />
    </div>
  );
};

export default IntroView;
