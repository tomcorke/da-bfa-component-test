import * as express from 'express'
import { DB } from './db'
import { APIPlayerOverviewSelectionsData, APIPlayerOverviewSelections } from '../../types/api'
import { BattleTag, BNetUser } from '../types'
import { isSuperAdmin } from './permissions'

export const selectionLockDb = new DB<APIPlayerOverviewSelectionsData>('selection-lock')

function clone<T> (data: T): T { return JSON.parse(JSON.stringify(data)) as T }

export const lockOverviewSelections = (battletag: BattleTag, selections: APIPlayerOverviewSelections) => {
  const data: APIPlayerOverviewSelectionsData = {
    selections: {
      ...selections
    },
    locked: true,
    confirmed: false
  }
  selectionLockDb.set(battletag, data)
  return true
}

export const confirmOverviewSelections = (battletag: BattleTag) => {
  const data = selectionLockDb.get(battletag)
  if (data) {
    const cloned = clone(data)
    cloned.confirmed = true
    selectionLockDb.set(battletag, cloned)
    return true
  }
  return false
}

export const unlockOverviewSelections = (req: express.Request, battletag: BattleTag) => {
  const data = selectionLockDb.get(battletag)
  if (data) {

    const userBattletag = (req.user as BNetUser).battletag
    if (data.confirmed && !isSuperAdmin(userBattletag)) return false

    const cloned = clone(data)
    cloned.locked = false
    cloned.confirmed = false
    selectionLockDb.set(battletag, cloned)
    return true
  }
  return false
}
