import { DB } from './db'
import { APIPlayerOverviewSelectionsData, APIPlayerOverviewSelections } from '../../types/api'
import { BattleTag } from '../types'

export const selectionsDb = new DB<APIPlayerOverviewSelectionsData>('selections')

function clone<T> (data: T): T { return JSON.parse(JSON.stringify(data)) as T }

export const lockOverviewSelections = (battletag: BattleTag, selections: APIPlayerOverviewSelections) => {
  const data: APIPlayerOverviewSelectionsData = {
    selections: {
      ...selections
    },
    locked: true,
    confirmed: false
  }
  selectionsDb.set(battletag, data)
  return true
}

export const confirmOverviewSelections = (battletag: BattleTag) => {
  const data = selectionsDb.get(battletag)
  if (data) {
    const cloned = clone(data)
    cloned.confirmed = true
    selectionsDb.set(battletag, cloned)
    return true
  }
  return false
}

export const unlockOverviewSelections = (battletag: BattleTag) => {
  const data = selectionsDb.get(battletag)
  if (data) {
    const cloned = clone(data)
    cloned.locked = false
    cloned.confirmed = false
    selectionsDb.set(battletag, cloned)
    return true
  }
  return false
}
