import * as express from 'express'

import { requireAuthentication, requireSuperAdmin } from '../middleware/auth'
import { BNetUser } from '../types'
import { AUDIT_LOG_EVENT_UPDATE_DATA, AUDIT_LOG_EVENT_SAVE_DATA, AUDIT_LOG_EVENT_CONFIRM } from '../../types/audit'
import { playerSelectionsDb, getUserData } from '../services/user-data'
import { bnetApi, tokenDb } from '../services/bnet-api'
import { APIPlayerSelections, APIPlayerSelection } from '../../types/api'
import { selectionLockDb, confirmOverviewSelections } from '../services/selections'
import { errorLog, log, auditLog } from '../services/logging'
import { detailedDiff } from 'deep-object-diff'
import { isSuperAdmin } from '../services/permissions'

const userRouter = express.Router()

const getAssumedUser = (req: express.Request): BNetUser => {
  if (!req.isAuthenticated()) throw Error('Requires authenticated user')

  let bnetUser = req.user as BNetUser
  if (isSuperAdmin(bnetUser.battletag)) {
    if (req.query.battletag) {
      const userToken = tokenDb.get(req.query.battletag) || ''
      bnetUser = {
        battletag: req.query.battletag,
        provider: 'bnet',
        token: userToken
      }
    }
  }

  return bnetUser
}

userRouter.get('/get', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }

  const bnetUser = req.user as BNetUser
  const assumedUser = getAssumedUser(req)

  res.json(await getUserData(bnetUser, false, assumedUser))
})

const formatPlayerSelections = (body: any): APIPlayerSelections => {
  if (!body || typeof body !== 'object') {
    return {}
  }
  try {
    return Object.entries(body).reduce((mapped: APIPlayerSelections, [key, entry]: [string, APIPlayerSelection]) => {
      return {
        ...mapped,
        [key]: {
          class: entry.class ? String(entry.class) : undefined,
          spec: entry.spec ? String(entry.spec) : undefined,
          comments: entry.comments ? String(entry.comments) : undefined
        }
      }
    }, {})
  } catch (e) {
    errorLog(`Error when attempting to parse user data body into APIPlayerSelections: ${e.message}`)
    return {}
  }
}

userRouter.post('/save', requireAuthentication, (req, res) => {
  if (!req.user) { return }

  const bnetUser = getAssumedUser(req)

  const battletag = bnetUser.battletag

  const lockData = selectionLockDb.get(battletag)
  if (lockData && lockData.locked) {
    return res.status(500).json({ ok: false })
  }

  log(`Saving data for user "${battletag}"`, req.body)
  const formattedBody = formatPlayerSelections(req.body)

  const existingData = playerSelectionsDb.get(battletag)
  if (existingData) {
    const dataDiff = detailedDiff(existingData, formattedBody)
    auditLog(AUDIT_LOG_EVENT_UPDATE_DATA, 'Updated user data', { id: battletag }, dataDiff)
  } else {
    auditLog(AUDIT_LOG_EVENT_SAVE_DATA, 'Saved new data', { id: battletag }, formattedBody)
  }

  playerSelectionsDb.set(battletag, formattedBody)
  res.json({ ok: true })
})

userRouter.delete('/delete', requireSuperAdmin, (req, res) => {
  if (!req.user) return

  const body = req.body || {}
  const { battletag } = body
  if (!battletag) {
    return res.status(400).send()
  }

  playerSelectionsDb.delete(battletag)
  selectionLockDb.delete(battletag)
  bnetApi.delete(battletag)

  res.status(200).send()
})

userRouter.post('/confirm', requireAuthentication, (req, res) => {
  if (!req.user) return

  const bnetUser = getAssumedUser(req)

  const battletag = bnetUser.battletag

  if (confirmOverviewSelections(battletag)) {
    auditLog(AUDIT_LOG_EVENT_CONFIRM, `Confirmed selections`, { id: battletag })
    return res.send('ok')
  }
  res.status(500).send('not ok')
})

export default userRouter
