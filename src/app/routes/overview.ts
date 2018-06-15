import * as express from 'express'

import { BNetUser } from '../types'
import { APIOverviewData, APILockedSelectionData, APIPlayerOverviewSelectionsMetaData, APIPlayerOverviewSelectionsData, APIPlayerSelectionsWithLock, APIPlayerSelections } from '../../types/api'

import { isAdmin } from '../services/permissions'
import { userSelectionsDb, mergeSelectionsWithLocks } from '../services/user-data'
import { bnetApi } from '../services/bnet-api'
import { selectionLockDb } from '../services/selections'

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
  const userSelectionData = userSelectionsDb.getAll() || {}

  const onlyLockedMetaData: (data: APIPlayerOverviewSelectionsData) => APIPlayerOverviewSelectionsMetaData =
    (fullSelectionData) => {
      return {
        locked: fullSelectionData.locked,
        confirmed: fullSelectionData.confirmed
      }
    }

  const locksData = selectionLockDb.getAll() || {}

  const lockedSelectionData: {
    [battletag: string]: APIPlayerOverviewSelectionsMetaData
  } = Object.entries(locksData).reduce((all, [battletag, entry]) => ({
    ...all,
    [battletag]: entry && onlyLockedMetaData(entry) || undefined
  }), {})

  const userSelectionDataWithLock = Object.entries(userSelectionData).reduce((allUserSelections, [battletag, selections]) => {
    return {
      ...allUserSelections,
      [battletag]: mergeSelectionsWithLocks(selections, locksData[battletag])
    }
  }, {})

  const userProfileData = bnetApi.getAll() || {}
  const data: APIOverviewData = { userSelectionData: userSelectionDataWithLock, lockedSelectionData, userProfileData }
  res.json(data)
})

export default overviewRouter
