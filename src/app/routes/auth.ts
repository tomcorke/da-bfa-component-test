import * as express from "express";
import * as helmet from "helmet";
import * as passport from "passport";

import { requireAuthentication } from "../middleware/auth";
import { bnetApi } from "../services/bnet-api";
import { getUserData } from "../services/user-data";
import { BNetUser } from "../types";

require("dotenv-safe").config();

const APP_BASE_URL = process.env.APP_BASE_URL || "";

const authRouter = express.Router();

authRouter.use(helmet.noCache());

authRouter.get("/bnet", passport.authenticate("bnet"), (req, res) =>
  res.render("login-redirect")
);

authRouter.get(
  "/bnet/callback",
  passport.authenticate("bnet", {
    failureRedirect: `${APP_BASE_URL}/auth/bnet/failure`
  }),
  (req, res) => res.redirect(`${APP_BASE_URL}/auth/bnet/success`)
);

authRouter.get("/bnet/success", requireAuthentication, async (req, res) => {
  bnetApi.registerUserForProfileRefresh(req.user as BNetUser);
  return res.render("login-success", {
    userData: JSON.stringify(await getUserData(req.user as BNetUser, true))
  });
});

authRouter.get("/bnet/failure", (req, res) => res.render("login-failure"));

export default authRouter;
