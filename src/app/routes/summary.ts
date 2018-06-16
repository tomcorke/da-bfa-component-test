import * as express from 'express'

import {
  APISummarySelection,
  APISummarySelections,
  LOCK_SELECTION_CHOICES,
  PlayerSelectionChoice
} from '../../types/api'

import { userSelectionsDb } from '../services/user-data'
import { selectionLockDb } from '../services/selections'
import { requireAdmin } from '../middleware/auth'
import { WowClassSafeName, WowSpecSafeName } from '../../types/classes'
import { getTags } from '../../data/classes'

const summaryRouter = express.Router()

summaryRouter.get('/get', requireAdmin, (req, res) => {

  const selectionData = userSelectionsDb.getAll()
  const lockData = selectionLockDb.getAll()

  if (!selectionData || !lockData) return res.status(500).send('no data')

  const lockedSelectionsSummary: APISummarySelections = {
    selections: Object.entries(lockData)
      .reduce((allSelections, [battletag, playerLockData]) => {
        if (!playerLockData) return allSelections
        if (!playerLockData.locked) return allSelections
        const userSelections = selectionData[battletag]
        if (!userSelections) return allSelections

        return allSelections.concat(
          LOCK_SELECTION_CHOICES
            .filter(choice => playerLockData.selections[choice])
            .map(choice => {
              const lockedPlayerChoice = playerLockData.selections[choice] as PlayerSelectionChoice
              const playerChoiceData = userSelections[lockedPlayerChoice]

              return {
                playerName: battletag,
                class: playerChoiceData.class as WowClassSafeName,
                spec: playerChoiceData.spec as WowSpecSafeName,
                choice,
                locked: playerLockData.locked,
                confirmed: playerLockData.confirmed,
                tags: getTags(playerChoiceData.class, playerChoiceData.spec)
              }
            })
        )
      }, [] as APISummarySelection[])
  }

  res.json(lockedSelectionsSummary)
})

export default summaryRouter
