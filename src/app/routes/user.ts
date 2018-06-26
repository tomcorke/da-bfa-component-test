import * as express from 'express'

import { requireAuthentication, requireSuperAdmin } from '../middleware/auth'
import { BNetUser } from '../types'
import { playerSelectionsDb, getUserData } from '../services/user-data'
import { bnetApi } from '../services/bnet-api'
import { APIPlayerSelections, APIPlayerSelection } from '../../types/api'
import { selectionLockDb } from '../services/selections'

const userRouter = express.Router()

userRouter.get('/get', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }
  res.json(await getUserData(req.user as BNetUser))
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
    console.error(`Error when attempting to parse user data body into APIPlayerSelections: ${e.message}`)
    return {}
  }
}

userRouter.post('/save', requireAuthentication, (req, res) => {
  if (!req.user) { return }

  const battletag = req.user.battletag

  const lockData = selectionLockDb.get(battletag)
  if (lockData && lockData.locked) {
    return res.status(500).json({ ok: false })
  }

  console.log(`Saving data for user "${battletag}"`, req.body)
  const formattedBody = formatPlayerSelections(req.body)
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

export default userRouter
