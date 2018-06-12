import * as request from 'request-promise-native'
import { DB } from './db'

import { APIPlayerProfile, APIPlayerCharacter } from '../../types/api'
import { BNetUser, BNetCharacter, BattleTag } from '../types'

const createUrl = (endpoint: string, token: string) => {
  const BASE_URL = `https://eu.api.battle.net`
  return `${BASE_URL}${endpoint}?access_token=${encodeURIComponent(token)}`
}

const profileDb = new DB<APIPlayerProfile>('profiles')
const requestCache: { [key: string]: Promise<any> | undefined } = {}

const CLASS_NAMES: { [key: number]: string } = {
  1: 'warrior',
  2: 'paladin',
  3: 'hunter',
  4: 'rogue',
  5: 'priest',
  6: 'deathknight',
  7: 'shaman',
  8: 'mage',
  9: 'warlock',
  10: 'monk',
  11: 'druid',
  12: 'demonhunter'
}

const charFilter = (char: APIPlayerCharacter) => {
  return (
    char.realm &&
    char.level >= 10
  )
}

const charTransform = (char: BNetCharacter): APIPlayerCharacter => {
  return {
    name: char.name,
    level: char.level,
    class: CLASS_NAMES[char.class],
    guild: char.guild,
    realm: char.realm
  }
}

class API {
  async getWoWProfile (user: BNetUser, immediate = false) {
    const url = createUrl('/wow/user/characters', user.token)

    let getProfile = requestCache[user.battletag]

    if (!getProfile) {
      getProfile = request(url, { json: true })
        .then(data => {
          if (data) {
            return {
              ...data,
              characters: data.characters.filter(charFilter).map(charTransform)
            }
          }
        })
        .catch(err => console.error(`Error getting wow profile data for "${user.battletag}": ${err.message}`))

      getProfile
        .then(data => {
          if (data) profileDb.set(user.battletag, data)
        })

      const removeFromRequestCache = () => { requestCache[user.battletag] = undefined }
      getProfile
        .then(removeFromRequestCache, removeFromRequestCache)

      requestCache[user.battletag] = getProfile
    }

    const cachedProfile = profileDb.get(user.battletag)
    if (cachedProfile) {
      console.log(`Returning cached wow profile data for "${user.battletag}"`)
      return cachedProfile
    }

    if (immediate) {
      return null
    }

    return getProfile
  }

  getAll () {
    return profileDb.getAll()
  }

  delete (battletag: BattleTag) {
    profileDb.delete(battletag)
  }
}

export const bnetApi = new API()
