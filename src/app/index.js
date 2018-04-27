import path from 'path'
import express from 'express'
import compression from 'compression'
import passport from 'passport'
import { Strategy as BnetStrategy } from 'passport-bnet'
import cookieParser from 'cookie-parser'
import session from 'express-session'

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

app.use(cookieParser())
app.use(session({
  secret: 'blizzard-distinctly-average',
  saveUninitialized: true,
  resave: true
}))
app.use(compression())

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

app.get('/auth/bnet', passport.authenticate('bnet'))
app.get(
  '/auth/bnet/callback',
  passport.authenticate('bnet', { failureRedirect: '/' }),
  (req, res) => res.send(
    `<html>
      <body>Login successful</body>
      <script>document.body.onload = () =>
        window.opener.postMessage(
          {
            status: 'success',
            userData: ${JSON.stringify(req.user)}
          },
          window.opener.location
        )
      </script>
    </html>`)
)

app.get(
  '/getUserData',
  (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ userData: req.user })
    }
    res.status(401).send()
  }
)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/*', express.static(path.join(__dirname, '../client')))

app.listen(3000)
