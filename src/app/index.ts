import * as path from 'path'
import * as express from 'express'
import * as compression from 'compression'
import * as passport from 'passport'
import { Strategy as BnetStrategy } from 'passport-bnet'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as handlebars from 'express-handlebars'

import {
  APIPlayer,
  APIPlayerData,
  APIPlayerSelections,
  APIOverviewData
} from '../types/api'

import { BNetUser } from './types'
import { DB } from './db'
import bnetApi from './bnet-api'
import { isAdmin, isSuperAdmin } from './permissions'

const userSelectionsDb = new DB<APIPlayerSelections>('data')

require('dotenv-safe').config()

passport.serializeUser((user: any, done: (a: any, b: any) => void) => {
  done(null, user)
})

passport.deserializeUser((obj: any, done: (a: any, b: any) => void) => {
  done(null, obj)
})

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
    (accessToken: string, refreshToken: string, profile: object, done: (a: any, b: any) => void) => {
      setImmediate(() => done(null, profile))
    }
  )
)

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: 'blizzard-distinctly-average',
  saveUninitialized: true,
  resave: true
}))
app.use(compression())

app.use(passport.initialize())
app.use(passport.session())

app.engine('.hbs', handlebars({
  extname: '.hbs'
}))
app.set('views', path.join(__dirname, '../../src/app/views'))
app.set('view engine', '.hbs')

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

const getUserData = async (user: BNetUser, immediate = false): Promise<APIPlayerData> => {
  const { battletag } = user
  const selections = userSelectionsDb.get(battletag)
  const profile = await bnetApi.getWoWProfile(user, immediate)
  const isUserAdmin = isAdmin(user)
  const isUserSuperAdmin = isSuperAdmin(user)
  return {
    user: { battletag: user.battletag },
    selections,
    profile,
    isAdmin: isUserAdmin,
    isSuperAdmin: isUserSuperAdmin
  }
}

app.get(
  '/auth/bnet',
  passport.authenticate('bnet'),
  (req, res) => res.send('<html><title>Redirecting for auth...</title></html>'))

app.get(
  '/auth/bnet/callback',
  passport.authenticate(
    'bnet',
    { failureRedirect: `${APP_BASE_URL}/auth/bnet/failure` }),
  (req, res) => res.redirect(`${APP_BASE_URL}/auth/bnet/success`))

app.get(
  '/auth/bnet/success',
  async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send()
    }
    return res.render('login-success', {
      userData: JSON.stringify(await getUserData(req.user as BNetUser, true))
    })
  }
)

app.get('/auth/bnet/failure', (req, res) => res.render('login-failure'))

app.get(
  '/getUserData',
  async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send()
    }
    res.json(await getUserData(req.user as BNetUser))
  }
)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect(APP_BASE_URL)
})

app.post('/save', (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).send()
  }
  const battletag = req.user.battletag
  console.log(`Saving data for user "${battletag}"`, req.body)
  userSelectionsDb.set(battletag, req.body)
  res.json({ ok: true })
})

app.get('/getOverviewViewData', (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    console.warn('Unauthenticated user attempted to get overview data')
    return res.status(401).send()
  }
  if (!isAdmin(req.user as BNetUser)) {
    console.warn(`Unauthorised user ${req.user.battletag} attempted to get overview data`)
    return res.status(403).send()
  }
  const userSelectionData = userSelectionsDb.getAll()
  const userProfileData = bnetApi.getAll()
  const data = { userSelectionData, userProfileData } as APIOverviewData
  res.json(data)
})

app.delete('/deletePlayerData', (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    console.warn('Unauthenticated user attempting to delete player data')
    return res.status(401).send()
  }
  const body = req.body || {}
  const { battletag } = body
  if (!battletag) {
    return res.status(400).send()
  }
  if (!isSuperAdmin(req.user as BNetUser)) {
    console.warn(`Unauthorised user ${req.user.battletag} attempted to delete player data for ${battletag}`)
    return res.status(403).send()
  }
  userSelectionsDb.delete(battletag)
  bnetApi.delete(battletag)
  res.status(200).send()
})

app.get('/*', express.static(path.join(__dirname, '../client')))

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`ERROR: ${req.url}`)
  console.error(err.stack)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send()
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`)
})
