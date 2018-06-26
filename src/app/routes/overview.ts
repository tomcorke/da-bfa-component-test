import * as express from 'express'

import {
  APIOverviewData,
  APIPlayerOverviewSelectionsMetaData,
  APIPlayerOverviewSelectionsData,
  APISetDisplayNamePayload,
  APISetDisplayNameResponse
} from '../../types/api'

import { playerSelectionsDb, mergeSelectionsWithLocks, playerDisplayNamesDb } from '../services/user-data'
import { bnetApi } from '../services/bnet-api'
import { selectionLockDb } from '../services/selections'
import { requireAdmin } from '../middleware/auth'

const overviewRouter = express.Router()

overviewRouter.get('/get', requireAdmin, (req, res) => {

  const playerSelectionData = playerSelectionsDb.getAll() || {}

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

  const userSelectionDataWithLock = Object.entries(playerSelectionData).reduce((allUserSelections, [battletag, selections]) => {
    return {
      ...allUserSelections,
      [battletag]: mergeSelectionsWithLocks(selections, locksData[battletag])
    }
  }, {})

  const playerProfileData = bnetApi.getAll() || {}
  const playerDisplayNames = playerDisplayNamesDb.getAll() || {}

  const data: APIOverviewData = {
    playerSelectionData: userSelectionDataWithLock,
    lockedSelectionData,
    playerProfileData,
    playerDisplayNames
  }
  res.json(data)
})

const validateSetDisplayNamePayload = (payload: APISetDisplayNamePayload): boolean => {
  if (!payload) return false
  if (typeof payload.battletag !== 'string') return false
  if (typeof payload.battletag !== 'string') return false
  return true
}

overviewRouter.post('/setDisplayName', requireAdmin, (req, res) => {

  const payload = req.body as APISetDisplayNamePayload
  if (!validateSetDisplayNamePayload(payload)) res.status(400).send()

  if (payload.name) {
    playerDisplayNamesDb.set(payload.battletag, payload.name)
  } else {
    playerDisplayNamesDb.delete(payload.battletag)
  }

  const displayNames = playerDisplayNamesDb.getAll() || {}

  const responseData: APISetDisplayNameResponse = displayNames

  res.status(200).json(responseData)
})

export default overviewRouter
