import path from 'path'
import express from 'express'
import compression from 'compression'
import passport from 'passport'
import { Strategy as BnetStrategy } from 'passport-bnet'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import handlebars from 'express-handlebars'

import { DB } from './db'
import bnetApi from './bnet-api'
import { isAdmin } from './permissions'

const userSelectionsDb = new DB('data')

require('dotenv-safe').config()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

const BNET_ID = process.env.BNET_KEY
const BNET_SECRET = process.env.BNET_SECRET
const BNET_CALLBACK_URL = process.env.BNET_CALLBACK_URL

const APP_BASE_URL = process.env.APP_BASE_URL

passport.use(
  new BnetStrategy(
    {
      clientID: BNET_ID,
      clientSecret: BNET_SECRET,
      scope: 'wow.profile',
      callbackURL: BNET_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
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

const getUserData = async (user, immediate = false) => {
  const { battletag } = user
  const selections = userSelectionsDb.get(battletag)
  const profile = await bnetApi.getWoWProfile(user, immediate)
  const isUserAdmin = isAdmin(user)
  return {
    user: { battletag: user.battletag },
    selections,
    profile,
    isAdmin: isUserAdmin
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
      userData: JSON.stringify(await getUserData(req.user, true))
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
    res.json(await getUserData(req.user))
  }
)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect(APP_BASE_URL)
})

app.post('/save', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }
  const battletag = req.user.battletag
  console.log(`Saving data for user "${battletag}"`, req.body)
  userSelectionsDb.set(battletag, req.body)
  res.json({ ok: true })
})

app.get('/getOverviewViewData', (req, res) => {
  if (!req.isAuthenticated()) {
    console.warn('Unauthenticated user attempted to get overview data')
    return res.status(401).send()
  }
  if (!isAdmin(req.user)) {
    console.warn(`Unauthorised user ${req.user.battletag} attempted to get overview data`)
    return res.status(401).send()
  }
  const userSelectionData = userSelectionsDb.getAll()
  const userProfileData = bnetApi.getAll()
  const data = { userSelectionData, userProfileData }
  res.json(data)
})

app.get('/*', express.static(path.join(__dirname, '../client')))

app.listen(3000)
