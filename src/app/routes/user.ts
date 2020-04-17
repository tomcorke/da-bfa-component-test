import { detailedDiff } from "deep-object-diff";
import * as express from "express";

import { APIPlayerSelection, APIPlayerSelections } from "../../types/api";
import {
  AUDIT_LOG_EVENT_CONFIRM,
  AUDIT_LOG_EVENT_SAVE_DATA,
  AUDIT_LOG_EVENT_UPDATE_DATA
} from "../../types/audit";
import { WowClassSafeName, WowSpecSafeName } from "../../types/classes";
import { requireGuild, requireSuperAdmin } from "../middleware/auth";
import { bnetApi, pendingTokenDb } from "../services/bnet-api";
import { auditLog, errorLog, log } from "../services/logging";
import { isSuperAdmin } from "../services/permissions";
import {
  confirmOverviewSelections,
  pendingSelectionLockDb
} from "../services/selections";
import { getUserData, pendingPlayerSelectionsDb } from "../services/user-data";
import { BNetUser } from "../types";

const userRouter = express.Router();

const getAssumedUser = async (req: express.Request): Promise<BNetUser> => {
  if (!req.isAuthenticated()) {
    throw Error("Requires authenticated user");
  }

  const tokenDb = await pendingTokenDb;

  let bnetUser = req.user as BNetUser;
  if (isSuperAdmin(bnetUser.battletag)) {
    if (req.query.battletag) {
      const userToken = tokenDb.get(req.query.battletag as string) || "";
      bnetUser = {
        battletag: req.query.battletag as string,
        provider: "bnet",
        token: userToken
      };
    }
  }

  return bnetUser;
};

userRouter.get("/get", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }

  const bnetUser = req.user as BNetUser;
  const assumedUser = await getAssumedUser(req);

  res.json(await getUserData(bnetUser, false, assumedUser));
});

const asClassString = (rawString: string) => {
  return String(rawString) as WowClassSafeName;
};
const asSpecString = (rawString: string) => {
  return String(rawString) as WowSpecSafeName;
};

const formatPlayerSelections = (body: any): APIPlayerSelections => {
  if (!body || typeof body !== "object") {
    return {};
  }
  const typedBody = body as { [key: string]: APIPlayerSelection };

  try {
    return Object.entries(typedBody).reduce((mapped, pair) => {
      const [key, entry] = pair;
      const selection: APIPlayerSelection = {
        class: entry.class ? asClassString(entry.class) : undefined,
        spec: entry.spec ? asSpecString(entry.spec) : undefined,
        comments: entry.comments ? String(entry.comments) : undefined
      };
      return {
        ...mapped,
        [key]: selection
      };
    }, {} as APIPlayerSelections);
  } catch (e) {
    errorLog(
      `Error when attempting to parse user data body into APIPlayerSelections: ${e.message}`
    );
    return {};
  }
};

userRouter.post("/save", requireGuild, async (req, res) => {
  if (!req.user) {
    return;
  }

  const bnetUser = await getAssumedUser(req);

  const battletag = bnetUser.battletag;

  const selectionLockDb = await pendingSelectionLockDb;
  const lockData = selectionLockDb.get(battletag);
  if (lockData && lockData.locked) {
    return res.status(500).json({ ok: false });
  }

  log(`Saving data for user "${battletag}"`, req.body);
  const formattedBody = formatPlayerSelections(req.body);

  const playerSelectionsDb = await pendingPlayerSelectionsDb;
  const existingData = playerSelectionsDb.get(battletag);
  if (existingData) {
    const dataDiff = detailedDiff(existingData, formattedBody);
    auditLog(
      AUDIT_LOG_EVENT_UPDATE_DATA,
      "Updated user data",
      { id: battletag },
      dataDiff
    );
  } else {
    auditLog(
      AUDIT_LOG_EVENT_SAVE_DATA,
      "Saved new data",
      { id: battletag },
      formattedBody
    );
  }

  playerSelectionsDb.set(battletag, formattedBody);
  res.json({ ok: true });
});

userRouter.delete("/delete", requireSuperAdmin, async (req, res) => {
  if (!req.user) {
    return;
  }

  const body = req.body || {};
  const { battletag } = body;
  if (!battletag) {
    return res.status(400).send();
  }

  const playerSelectionsDb = await pendingPlayerSelectionsDb;
  const selectionLockDb = await pendingSelectionLockDb;
  playerSelectionsDb.delete(battletag);
  selectionLockDb.delete(battletag);
  bnetApi.delete(battletag);

  res.status(200).send();
});

userRouter.post("/confirm", requireGuild, async (req, res) => {
  if (!req.user) {
    return;
  }

  const bnetUser = await getAssumedUser(req);

  const battletag = bnetUser.battletag;

  if (confirmOverviewSelections(battletag)) {
    auditLog(AUDIT_LOG_EVENT_CONFIRM, `Confirmed selections`, {
      id: battletag
    });
    return res.send("ok");
  }
  res.status(500).send("not ok");
});

export default userRouter;
