import * as express from 'express'

import {
  AppDataLoader,
  APIOverviewPlayerSelections
} from '../../types/api'

import { playerSelectionsDb } from '../services/user-data'
import { bnetApi } from '../services/bnet-api'
import { selectionLockDb } from '../services/selections'
import { requireAdmin } from '../middleware/auth'

const overviewRouter = express.Router()

const getOverviewData: AppDataLoader<APIOverviewPlayerSelections> = () => {
  return {} as APIOverviewPlayerSelections
}

overviewRouter.get('/get', requireAdmin, (req, res) => {
  const data = getOverviewData()
  res.json(data)

  /*

  const userSelectionData = playerSelectionsDb.getAll() || {}

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
  */
})

export default overviewRouter
