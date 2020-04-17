import * as express from "express";

import {
  APIOverviewData,
  APIPlayerOverviewSelectionsData,
  APIPlayerOverviewSelectionsMetaData,
  APISetDisplayNamePayload,
  APISetDisplayNameResponse
} from "../../types/api";
import { requireAdmin } from "../middleware/auth";
import { bnetApi } from "../services/bnet-api";
import { pendingSelectionLockDb } from "../services/selections";
import {
  mergeSelectionsWithLocks,
  pendingPlayerDisplayNamesDb,
  pendingPlayerSelectionsDb
} from "../services/user-data";

const overviewRouter = express.Router();

overviewRouter.get("/get", requireAdmin, async (req, res) => {
  const playerSelectionsDb = await pendingPlayerSelectionsDb;
  const playerSelectionData = playerSelectionsDb.getAll() || {};

  const onlyLockedMetaData: (
    data: APIPlayerOverviewSelectionsData
  ) => APIPlayerOverviewSelectionsMetaData = fullSelectionData => {
    return {
      locked: fullSelectionData.locked,
      confirmed: fullSelectionData.confirmed
    };
  };

  const selectionLockDb = await pendingSelectionLockDb;
  const locksData = selectionLockDb.getAll() || {};

  const lockedSelectionData: {
    [battletag: string]: APIPlayerOverviewSelectionsMetaData;
  } = Object.entries(locksData).reduce(
    (all, [battletag, entry]) => ({
      ...all,
      [battletag]: (entry && onlyLockedMetaData(entry)) || undefined
    }),
    {}
  );

  const userSelectionDataWithLock = Object.entries(playerSelectionData).reduce(
    (allUserSelections, [battletag, selections]) => {
      return {
        ...allUserSelections,
        [battletag]: mergeSelectionsWithLocks(selections, locksData[battletag])
      };
    },
    {}
  );

  const playerProfileData = (await bnetApi.getAll()) || {};
  const playerDisplayNamesDb = await pendingPlayerDisplayNamesDb;
  const playerDisplayNames = playerDisplayNamesDb.getAll() || {};

  const data: APIOverviewData = {
    playerSelectionData: userSelectionDataWithLock,
    lockedSelectionData,
    playerProfileData,
    playerDisplayNames
  };
  res.json(data);
});

const validateSetDisplayNamePayload = (
  payload: APISetDisplayNamePayload
): boolean => {
  if (!payload) {
    return false;
  }
  if (typeof payload.battletag !== "string") {
    return false;
  }
  if (typeof payload.battletag !== "string") {
    return false;
  }
  return true;
};

overviewRouter.post("/setDisplayName", requireAdmin, async (req, res) => {
  const payload = req.body as APISetDisplayNamePayload;
  if (!validateSetDisplayNamePayload(payload)) {
    res.status(400).send();
  }

  const playerDisplayNamesDb = await pendingPlayerDisplayNamesDb;

  if (payload.name) {
    await playerDisplayNamesDb.set(payload.battletag, payload.name);
  } else {
    playerDisplayNamesDb.delete(payload.battletag);
  }

  const displayNames = playerDisplayNamesDb.getAll() || {};

  const responseData: APISetDisplayNameResponse = displayNames;

  res.status(200).json(responseData);
});

export default overviewRouter;
