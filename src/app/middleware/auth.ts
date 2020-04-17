import * as express from "express";

import { guildConfig } from "../../guild-config";
import { pendingProfileDb } from "../services/bnet-api";
import { isAdmin, isSuperAdmin } from "../services/permissions";
import { BNetUser } from "../types";

const isAuthenticated = (req: express.Request) => {
  return req.isAuthenticated && req.isAuthenticated() && req.user;
};

export const requireAuthentication = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!isAuthenticated(req)) {
    return res.status(401).send();
  }

  return next();
};

export const requireGuild = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!isAuthenticated(req)) {
    return res.status(401).send();
  }

  const profileDb = await pendingProfileDb;

  const bnetUser = req.user as BNetUser;
  const profile = profileDb.get(bnetUser.battletag);
  const hasGuildCharacters =
    profile !== undefined &&
    profile.characters &&
    profile.characters.some(
      c =>
        c.guild === guildConfig.guild &&
        c.realm === guildConfig.realm &&
        c.realm === guildConfig.realm
    );

  if (!hasGuildCharacters) {
    return res.status(401).send();
  }

  return next();
};

export const requireAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!isAuthenticated(req)) {
    return res.status(401).send();
  }

  if (!isAdmin((req.user as BNetUser).battletag)) {
    return res.status(401).send();
  }

  return next();
};

export const requireSuperAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!isAuthenticated(req)) {
    return res.status(401).send();
  }

  if (!isSuperAdmin((req.user as BNetUser).battletag)) {
    return res.status(401).send();
  }

  return next();
};
