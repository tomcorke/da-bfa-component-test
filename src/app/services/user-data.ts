import {
  APIPlayerData,
  APIPlayerSelections
} from '../../types/api'
import { BNetUser } from '../types'

import { DB } from './db'
import { bnetApi } from './bnet-api'
import { isAdmin, isSuperAdmin } from './permissions'

export const userSelectionsDb = new DB<APIPlayerSelections>('data')

export const getUserData = async (user: BNetUser, immediate = false): Promise<APIPlayerData> => {
  const { battletag } = user
  const selections = userSelectionsDb.get(battletag)
  const profile = await bnetApi.getWoWProfile(user, { immediate })
  const isUserAdmin = isAdmin(user)
  const isUserSuperAdmin = isSuperAdmin(user)
  return {
    user: { battletag: user.battletag },
    selections,
    profile,
    isAdmin: isUserAdmin,
    isSuperAdmin: isUserSuperAdmin
  }
}
