import {
  APIPlayerData,
  APIPlayerSelections,
  APIPlayerSelectionsWithLock,
  LOCK_SELECTION_CHOICES,
  APIPlayerOverviewSelectionsData,
  APIPlayerSelectionWithLock,
  PLAYER_SELECTION_CHOICES,
  APIPlayerOverviewSelectionsMetaData
} from '../../types/api'
import { BNetUser } from '../types'

import { DB } from './db'
import { bnetApi } from './bnet-api'
import { isAdmin, isSuperAdmin } from './permissions'
import { selectionLockDb } from './selections'

interface LegacyAPIPlayerSelection {
  selected: {
    class?: string
    spec?: string
  }
  comments?: string
}

export const userSelectionsDb = new DB<APIPlayerSelections>('data')

// Flatten existing data in userSelectionsDb
const existingData = userSelectionsDb.getAll() || {}
Object.entries(existingData).forEach(([battletag, data]) => {
  if (!data) return
  PLAYER_SELECTION_CHOICES.forEach(choice => {
    const choiceData = data[choice]
    if (!choiceData) return
    const legacyData = (choiceData as any) as LegacyAPIPlayerSelection
    if (legacyData.selected) {
      data[choice] = {
        class: legacyData.selected.class,
        spec: legacyData.selected.spec,
        comments: legacyData.comments
      }
    }
  })
  userSelectionsDb.set(battletag, data)
})

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

  const selections = userSelectionsDb.get(battletag) || {}
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
