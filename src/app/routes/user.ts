import * as express from 'express'

import { BNetUser } from '../types'
import { userSelectionsDb, getUserData } from '../services/user-data'
import { isSuperAdmin } from '../services/permissions'
import { bnetApi } from '../services/bnet-api'

const userRouter = express.Router()

userRouter.get('/get', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }
  res.json(await getUserData(req.user as BNetUser))
})

userRouter.post('/save', (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).send()
  }
  const battletag = req.user.battletag
  console.log(`Saving data for user "${battletag}"`, req.body)
  userSelectionsDb.set(battletag, req.body)
  res.json({ ok: true })
})

userRouter.delete('/delete', (req, res) => {
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

export default userRouter
