import * as express from "express";

import { getTags } from "../../data/classes";
import {
  APISummarySelection,
  APISummarySelections,
  LOCK_SELECTION_CHOICES,
  PlayerSelectionChoice
} from "../../types/api";
import { WowClassSafeName, WowSpecSafeName } from "../../types/classes";
import { requireGuild } from "../middleware/auth";
import { pendingSelectionLockDb } from "../services/selections";
import {
  pendingPlayerDisplayNamesDb,
  pendingPlayerSelectionsDb
} from "../services/user-data";

const summaryRouter = express.Router();

summaryRouter.get("/get", requireGuild, async (req, res) => {
  const [
    playerSelectionsDb,
    selectionLockDb,
    playerDisplayNamesDb
  ] = await Promise.all([
    pendingPlayerSelectionsDb,
    pendingSelectionLockDb,
    pendingPlayerDisplayNamesDb
  ]);

  const selectionData = playerSelectionsDb.getAll();
  const allLockData = selectionLockDb.getAll();
  const displayNames = playerDisplayNamesDb.getAll() || {};

  if (!selectionData || !allLockData) {
    return res.status(500).send("no data");
  }

  const lockedSelectionsSummary: APISummarySelections = {
    selections: Object.entries(allLockData).reduce(
      (allSelections, [battletag, playerLockData]) => {
        if (!playerLockData) {
          return allSelections;
        }
        if (!playerLockData.locked) {
          return allSelections;
        }
        const userSelections = selectionData[battletag];
        if (!userSelections) {
          return allSelections;
        }

        return allSelections.concat(
          LOCK_SELECTION_CHOICES.filter(choice => {
            const lockData = playerLockData.selections[choice];
            if (!lockData) {
              return false;
            }
            const userSelectionData = userSelections[lockData];
            return !!userSelectionData;
          }).map(choice => {
            const lockedPlayerChoice = playerLockData.selections[
              choice
            ] as PlayerSelectionChoice;
            const playerChoiceData = userSelections[lockedPlayerChoice];

            return {
              playerName: displayNames[battletag] || battletag,
              class: playerChoiceData.class as WowClassSafeName,
              spec: playerChoiceData.spec as WowSpecSafeName,
              choice,
              locked: playerLockData.locked,
              confirmed: playerLockData.confirmed,
              tags: getTags(playerChoiceData.class, playerChoiceData.spec)
            };
          })
        );
      },
      [] as APISummarySelection[]
    )
  };

  res.json(lockedSelectionsSummary);
});

export default summaryRouter;
