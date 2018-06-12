import * as path from 'path'
import * as express from 'express'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as handlebars from 'express-handlebars'

import {
  APIOverviewData
} from '../types/api'
import { passportInit } from './services/passport'
import { BNetUser } from './types'
import { bnetApi } from './services/bnet-api'
import { isSuperAdmin } from './services/permissions'
import { userSelectionsDb, getUserData } from './services/user-data'

import userRouter from './routes/user'
import overviewRouter from './routes/overview'

require('dotenv-safe').config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: 'blizzard-distinctly-average',
  saveUninitialized: true,
  resave: true
}))
app.use(compression())

passportInit(app)

app.engine('.hbs', handlebars({
  extname: '.hbs'
}))
app.set('views', path.join(__dirname, '../../src/app/views'))
app.set('view engine', '.hbs')

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

app.use('/user', userRouter)

app.use('/overview', overviewRouter)

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
