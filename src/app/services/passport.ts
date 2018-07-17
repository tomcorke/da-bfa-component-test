import * as express from 'express'
import * as passport from 'passport'
import { Strategy as BnetStrategy } from 'passport-bnet'
import { auditLog } from './logging'
import { AUDIT_LOG_EVENT_LOGIN } from '../../types/audit'

import authRouter from '../routes/auth'

require('dotenv-safe').config()

const BNET_ID = process.env.BNET_KEY || ''
const BNET_SECRET = process.env.BNET_SECRET || ''
const BNET_CALLBACK_URL = process.env.BNET_CALLBACK_URL || ''

const APP_BASE_URL = process.env.APP_BASE_URL || ''

passport.use(
  new BnetStrategy(
    {
      clientID: BNET_ID,
      clientSecret: BNET_SECRET,
      scope: 'wow.profile',
      callbackURL: BNET_CALLBACK_URL
    },
    (accessToken: string, refreshToken: string, profile: any, done: (a: any, b: any) => void) => {
      auditLog(AUDIT_LOG_EVENT_LOGIN, 'Logged in with Battle.net', { id: profile.battletag })
      setImmediate(() => done(null, profile))
    }
  )
)

passport.serializeUser((user: any, done: (a: any, b: any) => void) => {
  done(null, user)
})

passport.deserializeUser((obj: any, done: (a: any, b: any) => void) => {
  done(null, obj)
})

export const passportInit = (app: express.Express) => {

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/auth', authRouter)

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect(APP_BASE_URL)
  })
}
