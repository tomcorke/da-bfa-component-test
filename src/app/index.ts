import * as path from 'path'
import * as express from 'express'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as handlebars from 'express-handlebars'
import * as helmet from 'helmet'
import * as git from 'git-rev'

import { passportInit } from './services/passport'
import { log, auditLog, errorLog } from './services/logging'

import userRouter from './routes/user'
import overviewRouter from './routes/overview'
import selectionsRouter from './routes/selections'
import summaryRouter from './routes/summary'

require('dotenv-safe').config()

const app = express()

app.use(helmet())
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

const getGitRev = new Promise<string>((resolve) => {
  git.short(short => {
    auditLog(`Server running git revision: ${short}`)
    resolve(short)
  })
})

app.use(async (req, res, next) => {
  log(`${req.method} ${req.path}`)
  const gitRev = await getGitRev
  res.header('x-rev', gitRev)
  next()
})

app.use('/user', userRouter)
app.use('/overview', overviewRouter)
app.use('/selections', selectionsRouter)
app.use('/summary', summaryRouter)

app.get('/*', express.static(path.join(__dirname, '../client')))

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorLog(`ERROR: ${req.url}`, undefined, err.stack)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send()
})

const PORT = 3000
app.listen(PORT, () => {
  log(`Server started successfully. Listening on :${PORT}`)
})
