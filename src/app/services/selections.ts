import * as express from "express";

import {
  APIPlayerOverviewSelections,
  APIPlayerOverviewSelectionsData
} from "../../types/api";
import { BattleTag, BNetUser } from "../types";

import { getDB } from "./db";
import { isSuperAdmin } from "./permissions";

export const pendingSelectionLockDb = getDB<APIPlayerOverviewSelectionsData>(
  "selection-lock"
);

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

export const lockOverviewSelections = async (
  battletag: BattleTag,
  selections: APIPlayerOverviewSelections
) => {
  const selectionLockDb = await pendingSelectionLockDb;
  const data: APIPlayerOverviewSelectionsData = {
    selections: {
      ...selections
    },
    locked: true,
    confirmed: false
  };
  selectionLockDb.set(battletag, data);
  return true;
};

export const confirmOverviewSelections = async (battletag: BattleTag) => {
  const selectionLockDb = await pendingSelectionLockDb;
  const data = selectionLockDb.get(battletag);
  if (data) {
    const cloned = clone(data);
    cloned.confirmed = true;
    selectionLockDb.set(battletag, cloned);
    return true;
  }
  return false;
};

export const unlockOverviewSelections = async (
  req: express.Request,
  battletag: BattleTag
) => {
  const selectionLockDb = await pendingSelectionLockDb;
  const data = selectionLockDb.get(battletag);
  if (data) {
    const userBattletag = (req.user as BNetUser).battletag;
    if (data.confirmed && !isSuperAdmin(userBattletag)) {
      return false;
    }

    const cloned = clone(data);
    cloned.locked = false;
    cloned.confirmed = false;
    selectionLockDb.set(battletag, cloned);
    return true;
  }
  return false;
};
