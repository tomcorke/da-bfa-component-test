import * as express from 'express'
import * as passport from 'passport'

import { requireAuthentication } from '../middleware/auth'
import { getUserData } from '../services/user-data'
import { BNetUser } from '../types'
import { bnetApi } from '../services/bnet-api'

require('dotenv-safe').config()

const APP_BASE_URL = process.env.APP_BASE_URL || ''

const authRouter = express.Router()

authRouter.get(
  '/bnet',
  passport.authenticate('bnet'),
  (req, res) => res.send('<html><title>Redirecting for auth...</title></html>'))

authRouter.get(
  '/bnet/callback',
  passport.authenticate(
    'bnet',
    { failureRedirect: `${APP_BASE_URL}/auth/bnet/failure` }),
  (req, res) => res.redirect(`${APP_BASE_URL}/auth/bnet/success`))

authRouter.get(
  '/bnet/success',
  requireAuthentication,
  async (req, res) => {
    bnetApi.registerUserForProfileRefresh(req.user as BNetUser)
    return res.render('login-success', {
      userData: JSON.stringify(await getUserData(req.user as BNetUser, true))
    })
  })

authRouter.get(
  '/bnet/failure',
  (req, res) => res.render('login-failure'))

export default authRouter
