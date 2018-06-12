import * as express from 'express'

import { BNetUser } from '../types'
import { APIOverviewData } from '../../types/api'

import { isAdmin } from '../services/permissions'
import { userSelectionsDb } from '../services/user-data'
import { bnetApi } from '../services/bnet-api'

const overviewRouter = express.Router()

overviewRouter.get('/get', (req, res) => {
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

export default overviewRouter
