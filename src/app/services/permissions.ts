import { BNetUser } from "../types";

require("dotenv-safe").config();

const superadmin = process.env.SUPERADMIN;
const admins = (process.env.ADMINS && process.env.ADMINS.split(",")) || [];

const isAdmin = (battletag: string) => {
  return superadmin === battletag || admins.includes(battletag);
};

const isSuperAdmin = (battletag: string) => {
  return superadmin === battletag;
};

export { isAdmin, isSuperAdmin };
