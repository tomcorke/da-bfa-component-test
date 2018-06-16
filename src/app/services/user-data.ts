import {
} from '../../types/api'

import { BNetUser } from '../types'

import { DB } from './db'
import { bnetApi } from './bnet-api'
import { isAdmin, isSuperAdmin } from './permissions'
import { selectionLockDb } from './selections'

export const playerSelectionsDb = new DB<APIPlayerSelections>('data')

export const mergeSelectionsWithLocks
  : (selections?: APIPlayerSelections, locks?: APIPlayerOverviewSelectionsData) => APIPlayerSelectionsWithLock
  = (selections = {}, lockData = { selections: {}, locked: false, confirmed: false }) => {
    return Object.entries(selections).reduce((allSelections, [choice, selection]) => {
      const selectionWithLock: APIPlayerSelectionWithLock = {
        ...selection,
        locked: false
      }
      if (lockData.locked) {
        selectionWithLock.locked = true
        selectionWithLock.lockedChoice = LOCK_SELECTION_CHOICES.find(lockChoice => lockData.selections[lockChoice] === choice)
      }
      return {
        ...allSelections,
        [choice]: selectionWithLock
      }
    }, {})
  }

const onlyLockMetaData = (lockData?: APIPlayerOverviewSelectionsData): APIPlayerOverviewSelectionsMetaData => {
  if (!lockData) {
    return {
      locked: false,
      confirmed: false
    }
  }
  return {
    locked: lockData.locked,
    confirmed: lockData.confirmed
  }
}

export const getUserData = async (user: BNetUser, immediate = false): Promise<APIPlayerData> => {
  const { battletag } = user

  const selections = playerSelectionsDb.get(battletag) || {}
  const lockData = selectionLockDb.get(battletag)

  const selectionsWithLockData = mergeSelectionsWithLocks(selections, lockData)

  const profile = await bnetApi.getWoWProfile(user, { immediate })
  const isUserAdmin = isAdmin(user)
  const isUserSuperAdmin = isSuperAdmin(user)
  return {
    user: { battletag: user.battletag },
    selections: selectionsWithLockData,
    lockData: onlyLockMetaData(lockData),
    profile,
    isAdmin: isUserAdmin,
    isSuperAdmin: isUserSuperAdmin
  }
}
