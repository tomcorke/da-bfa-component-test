import {
  APIPlayerData,
  APIPlayerOverviewSelectionsData,
  APIPlayerOverviewSelectionsMetaData,
  APIPlayerSelections,
  APIPlayerSelectionsWithLock,
  APIPlayerSelectionWithLock,
  LOCK_SELECTION_CHOICES
} from "../../types/api";
import { BNetUser } from "../types";

import { bnetApi } from "./bnet-api";
import { getDB } from "./db";
import { isAdmin, isSuperAdmin } from "./permissions";
import { pendingSelectionLockDb } from "./selections";

export const pendingPlayerSelectionsDb = getDB<APIPlayerSelections>("data");
export const pendingPlayerDisplayNamesDb = getDB<string>("displayNames");

export const mergeSelectionsWithLocks: (
  selections?: APIPlayerSelections,
  locks?: APIPlayerOverviewSelectionsData
) => APIPlayerSelectionsWithLock = (
  selections = {},
  lockData = { selections: {}, locked: false, confirmed: false }
) => {
  return Object.entries(selections).reduce(
    (allSelections, [choice, selection]) => {
      const selectionWithLock: APIPlayerSelectionWithLock = {
        ...selection,
        locked: false
      };
      if (lockData.locked) {
        selectionWithLock.locked = true;
        selectionWithLock.lockedChoice = LOCK_SELECTION_CHOICES.find(
          lockChoice => lockData.selections[lockChoice] === choice
        );
      }
      return {
        ...allSelections,
        [choice]: selectionWithLock
      };
    },
    {}
  );
};

const onlyLockMetaData = (
  lockData?: APIPlayerOverviewSelectionsData
): APIPlayerOverviewSelectionsMetaData => {
  if (!lockData) {
    return {
      locked: false,
      confirmed: false
    };
  }
  return {
    locked: lockData.locked,
    confirmed: lockData.confirmed
  };
};

export const getUserData = async (
  user: BNetUser,
  immediate = false,
  assumedUser?: BNetUser
): Promise<APIPlayerData> => {
  const playerSelectionsDb = await pendingPlayerSelectionsDb;
  const selectionLockDb = await pendingSelectionLockDb;

  const getUser = assumedUser || user;

  const selections = playerSelectionsDb.get(getUser.battletag) || {};
  const lockData = selectionLockDb.get(getUser.battletag);

  const selectionsWithLockData = mergeSelectionsWithLocks(selections, lockData);

  const profile = await bnetApi.getWoWProfile(getUser, { immediate });
  const isUserAdmin = isAdmin(user.battletag);
  const isUserSuperAdmin = isSuperAdmin(user.battletag);
  return {
    user: { battletag: user.battletag },
    selections: selectionsWithLockData,
    lockData: onlyLockMetaData(lockData),
    profile,
    isAdmin: isUserAdmin,
    isSuperAdmin: isUserSuperAdmin
  };
};
