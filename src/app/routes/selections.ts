import * as express from 'express'

import { requireAuthentication } from '../middleware/auth'
import { PlayerSelectionChoice, APILockSelectionsPayload } from '../../types/api'
import { lockOverviewSelections } from '../services/selections'

const selectionsRouter = express.Router()

const isPlayerChoice = (value: any): value is PlayerSelectionChoice => {
  return ['first', 'second', 'third'].includes(value)
}

const formatLockSelectionsPayload = (body: any): APILockSelectionsPayload | undefined => {

  console.log(body)

  if (!body || typeof body !== 'object') {
    return
  }

  if (!body.battletag || !body.playerOverviewSelections) {
    return
  }

  return {
    battletag: String(body.battletag),
    playerOverviewSelections: {
      first: isPlayerChoice(body.playerOverviewSelections.first) ? body.playerOverviewSelections.first : undefined,
      second: isPlayerChoice(body.playerOverviewSelections.second) ? body.playerOverviewSelections.second : undefined
    }
  }
}

selectionsRouter.post('/lock', requireAuthentication, (req, res) => {
  const body = formatLockSelectionsPayload(req.body)
  if (body && lockOverviewSelections(body.battletag, body.playerOverviewSelections)) {
    return res.send('ok')
  }
  res.status(500).send('not ok')
})

export default selectionsRouter
