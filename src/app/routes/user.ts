import * as express from 'express'

import { requireAuthentication } from '../middleware/auth'
import { BNetUser } from '../types'
import { userSelectionsDb, getUserData } from '../services/user-data'
import { isSuperAdmin } from '../services/permissions'
import { bnetApi } from '../services/bnet-api'
import { APIPlayerSelections, APIPlayerSelection, APIFlatPlayerSelection } from '../../types/api'

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
    return Object.entries(body).reduce((mapped: APIPlayerSelections, [key, entry]: [string, APIFlatPlayerSelection]) => {
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
  console.log(`Saving data for user "${battletag}"`, req.body)
  const filteredBody = formatPlayerSelections(req.body)
  userSelectionsDb.set(battletag, filteredBody)
  res.json({ ok: true })
})

userRouter.delete('/delete', requireAuthentication, (req, res) => {
  if (!req.user) return

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

export default userRouter
