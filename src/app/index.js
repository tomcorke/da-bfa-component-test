import path from 'path'
import express from 'express'
import compression from 'compression'
import passport from 'passport'
import { Strategy as BnetStrategy } from 'passport-bnet'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import handlebars from 'express-handlebars'

import db from './db'

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

app.get('/auth/bnet', passport.authenticate('bnet'))
app.get(
  '/auth/bnet/callback',
  passport.authenticate(
    'bnet',
    { failureRedirect: `${APP_BASE_URL}/auth/bnet/failure` }),
  (req, res) => res.redirect('/auth/bnet/success'))

app.get('/auth/bnet/success', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }
  const { battletag } = req.user
  const data = db.get(battletag)
  console.log(`(Auth) Loaded data for user "${battletag}"`, data)
  return res.render('login-success', {
    userData: JSON.stringify({
      user: req.user,
      data
    })
  })
})
app.get('/auth/bnet/failure', (req, res) => res.render('login-failure'))

app.get(
  '/getUserData',
  (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send()
    }
    const { battletag } = req.user
    const data = db.get(battletag)
    console.log(`(getUserData) Loaded data for user "${battletag}"`, data)
    res.json({ user: req.user, data })
  }
)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect(APP_BASE_URL)
})

app.post('/load', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }
  const battletag = req.user.battletag
  const data = db.get(battletag)
  res.json(data)
})

app.post('/save', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }
  const battletag = req.user.battletag
  console.log(req.body)
  console.log(`Saving data for user "${battletag}"`, req.body)
  db.set(battletag, req.body)
  res.json({ ok: true })
})

app.get('/*', express.static(path.join(__dirname, '../client')))

app.listen(3000)
