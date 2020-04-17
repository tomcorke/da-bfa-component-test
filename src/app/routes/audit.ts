import * as express from "express";
import * as fg from "fast-glob";
import * as fs from "fs";

import { APIAuditData } from "../../types/api";
import { AuditLogEntry, AuditUserFlags } from "../../types/audit";
import { requireSuperAdmin } from "../middleware/auth";
import { isAdmin, isSuperAdmin } from "../services/permissions";
import { playerDisplayNamesDb } from "../services/user-data";

const auditRouter = express.Router();

const parseAuditLine = (auditLine: string): AuditLogEntry | undefined => {
  try {
    const data = JSON.parse(auditLine, (key: any, value: any) => {
      if (key === "timestamp") {
        return new Date(value);
      }
      return value;
    });
    return data as AuditLogEntry;
  } catch (e) {
    /* Do nothing */
  }
};

auditRouter.get("/get", requireSuperAdmin, async (req, res) => {
  const auditFiles = await fg.async("./logs/audit.log*");

  const auditFileLines: string[][] = await Promise.all(
    auditFiles.map(
      file =>
        new Promise<string[]>((resolve, reject) => {
          fs.readFile(file as string, "utf8", (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data.split("\n"));
          });
        })
    )
  );

  const auditLines: string[] = ([] as string[]).concat(...auditFileLines);
  const auditEntries: AuditLogEntry[] = (auditLines
    .map(parseAuditLine)
    .filter(entry => entry !== undefined) as AuditLogEntry[]).sort(
    (a, b) => (a.timestamp < b.timestamp ? -1 : 1)
  );

  const userCache: {
    [key: string]: {
      name?: string;
      flags: AuditUserFlags;
    };
  } = {};

  auditEntries.forEach(entry => {
    if (entry.user) {
      if (userCache[entry.user.id]) {
        entry.user = { ...entry.user, ...userCache[entry.user.id] };
        return;
      }
      const data = (userCache[entry.user.id] = {
        name: playerDisplayNamesDb.get(entry.user.id),
        flags: {
          admin: isAdmin(entry.user.id),
          superAdmin: isSuperAdmin(entry.user.id)
        }
      });
      entry.user = { ...entry.user, ...data };
    }
  });

  const auditData: APIAuditData = {
    entries: auditEntries
  };

  res.json(auditData);
});

export default auditRouter;
