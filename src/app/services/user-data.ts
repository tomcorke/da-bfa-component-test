import {
  APIPlayerData,
  APIPlayerSelections,
  APIPlayerSelectionsWithLock,
  PlayerSelectionChoice,
  APIPlayerSelection,
  APIPlayerOverviewSelectionsData,
  APILockedSelectionData,
  LockSelectionChoice
} from '../../types/api'
import { BNetUser } from '../types'

import { DB } from './db'
import { bnetApi } from './bnet-api'
import { isAdmin, isSuperAdmin } from './permissions'
import { selectionsDb } from './selections'

export const userSelectionsDb = new DB<APIPlayerSelections>('data')

export const getUserData = async (user: BNetUser, immediate = false): Promise<APIPlayerData> => {
  const { battletag } = user

  const selections = userSelectionsDb.get(battletag) || {}
  const lockData = selectionsDb.get(battletag) || { locked: false, confirmed: false }

  const selectionsWithLockData: APIPlayerSelectionsWithLock = {}
  Object.entries(selections).forEach(([choice, selectionData]: [string, APIPlayerSelection]) => {
    const selectionLockData: APILockedSelectionData = { locked: false }
    if (lockData.locked) {
      selectionLockData.locked = true
      selectionLockData.lockedChoice = ['first', 'second'].find(lockChoice => lockData.selections[lockChoice] === choice) as LockSelectionChoice
    }
    selectionsWithLockData[choice] = {
      ...selectionData,
      ...selectionLockData
    }
  })

  const profile = await bnetApi.getWoWProfile(user, { immediate })
  const isUserAdmin = isAdmin(user)
  const isUserSuperAdmin = isSuperAdmin(user)
  return {
    user: { battletag: user.battletag },
    selections: selectionsWithLockData,
    profile,
    isAdmin: isUserAdmin,
    isSuperAdmin: isUserSuperAdmin
  }
}
