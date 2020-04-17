import * as React from "react";

import * as STYLES from "./confirm-selections-prompt.scss";

import Panel from "../../../../panel";
import ConfirmButton from "../confirm-button";

interface ConfirmSelectionsPromptProps {
  hide: () => any;
}

const NO_BUBBLE = event => {
  event.stopPropagation();
};

const ConfirmSelectionsPrompt = ({ hide }: ConfirmSelectionsPromptProps) => {
  return (
    <div className={STYLES.confirmSelectionsPrompt} onClick={hide}>
      <div className={STYLES.inner} onClick={NO_BUBBLE}>
        <Panel>
          <h2>Standards for Battle for Azeroth</h2>

          <ol>
            <li>
              All raiders must be committed to attending 95% of progress raids -
              We are a smaller team than the average, meaning that we don’t
              bench commonly. This means attendance is almost always mandatory.
              This does not apply to the alt run - See rule 5
            </li>
            <li>
              All raiders must understand that raid time is precious, and
              therefore time wasting will not be accepted. Occassionally things
              will happen, but constant wastes of time i.e. AFK between pulls,
              not eating immediately etc will not be tolerated. We aim for 40
              seconds between pulls.
            </li>
            <li>
              All raiders must understand that loot is simply a means to an end
              and that if it's possible to upgrade someone else by a larger
              margin than yourself, then you should be trying to help the team.
              This applies only to raiding, although try to have the mindset
              everywhere, for better and easier progression. Example - Player 1
              5% upgrade, but Player two 15% - Player one should trade to player
              two if possible. This results in larger net gain.
            </li>
            <li>
              All raiders must understand that having a positive attitude
              towards raiding is needed. There will be bosses on which we wipe
              hundreds of times, mistakes will happen and people will learn at
              different paces. Remain patient, and do everything you possibly
              can to be the best you can.
            </li>
            <li>
              All raiders must maintain ONE alternative character to within a
              reason of their main, this is important for a number of reasons,
              which can be explained if you contact an officer.
            </li>
            <li>
              The calendar will work in the following way - Sign up to raids at
              your earliest convinience. Try not to forget, as this will
              strongly hinder the planning for raids.
              <ul>
                <li>
                  Confirmed = Confirmed a spot for raid and expected to attend
                </li>
                <li>
                  Standby = Expected to show up at beginning of raid, incase of
                  drop-outs
                </li>
                <li>Out = Not needed for current raid night</li>
                <li>
                  Invited = Player has not checked calendar, everyone please
                  remind.
                </li>
              </ul>
            </li>
          </ol>

          <ConfirmButton />
        </Panel>
      </div>
    </div>
  );
};

export default ConfirmSelectionsPrompt;
