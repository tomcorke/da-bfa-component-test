import * as request from 'request-promise-native'
import { DB } from './db'

import { APIPlayerProfile, APIPlayerCharacter } from '../../types/api'
import { BNetUser, BNetCharacter, BattleTag } from '../types'
import { WowClassSafeName } from '../../types/classes'
import { errorLog, log } from './logging'

const createUrl = (endpoint: string, token: string) => {
  const BASE_URL = `https://eu.api.battle.net`
  return `${BASE_URL}${endpoint}?access_token=${encodeURIComponent(token)}`
}

const profileDb = new DB<APIPlayerProfile>('profiles')
const tokenDb = new DB<string>('tokens')

const CLASS_NAMES: { [key: number]: WowClassSafeName } = {
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

interface UserRefresher {
  flags: {
    cancel: boolean
  }
  refreshPromise: Promise<void>
}

interface GetWowProfileOptions {
  immediate?: boolean
  noCache?: boolean
  throwOnFail?: boolean
}

const NO_OP = () => { /* Do nothing */ }

const DEFAULT_USER_REFRESH = 30 * 60 * 1000 // 30 mins

class API {
  private userRefreshers: { [key: string]: UserRefresher } = {}
  private requestCache: { [key: string]: Promise<any> | undefined } = {}

  async getWoWProfile (user: BNetUser, opts: GetWowProfileOptions = {}) {
    const url = createUrl('/wow/user/characters', user.token)

    let getProfile = this.requestCache[user.battletag]

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
        .catch(err => {
          errorLog(`Error getting wow profile data for "${user.battletag}": ${err.message}`)
          if (!err.message.startsWith('504 - ') && opts.throwOnFail) {
            throw err
          }
        })

      getProfile
        .then(data => {
          if (data) profileDb.set(user.battletag, data)
        })
        .catch(NO_OP)

      const removeFromRequestCache = () => { this.requestCache[user.battletag] = undefined }
      getProfile
        .then(removeFromRequestCache)
        .catch(removeFromRequestCache)

      this.requestCache[user.battletag] = getProfile.catch(NO_OP)
    }

    const cachedProfile = profileDb.get(user.battletag)
    if (cachedProfile && !opts.noCache) {
      log(`Returning cached wow profile data for "${user.battletag}"`)
      return cachedProfile
    }

    if (opts.immediate) {
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

  registerUserForProfileRefresh (user: BNetUser) {
    log(`Starting scheduled refresh of profile for "${user.battletag}"`)
    tokenDb.set(user.battletag, user.token)
    this.scheduleUserRefresh(user)
  }

  loadTokens () {
    const tokens = tokenDb.getAll()
    if (tokens) {
      Object.entries(tokens).forEach(([ battletag, token ]) => {
        if (token) {
          this.registerUserForProfileRefresh({ battletag, token } as BNetUser)
        }
      })
    }
  }

  private scheduleUserRefresh (user: BNetUser, time: number = DEFAULT_USER_REFRESH) {
    const existingRefresh = this.userRefreshers[user.battletag]
    if (existingRefresh) {
      existingRefresh.flags.cancel = true
    }

    const flags = {
      cancel: false
    }
    const refreshPromise = new Promise((resolve) => {
      setTimeout(resolve, time)
    })
    .then(() => {
      if (!flags.cancel) {
        log(`calling scheduled user refresh for "${user.battletag}"`)
        return this.getWoWProfile(user, {
          noCache: true,
          throwOnFail: true
        })
          .then(() => log(`Successful scheduled refresh for "${user.battletag}"`))
          .then(() => this.scheduleUserRefresh(user))
          .catch((err) => {
            tokenDb.delete(user.battletag)
            log(`Error on scheduled user refresh for "${user.battletag}": ${err.message}`)
          })
      } else {
        tokenDb.delete(user.battletag)
      }
    })
    .catch((err) => {
      tokenDb.delete(user.battletag)
      errorLog(err)
    })

    this.userRefreshers[user.battletag] = {
      flags,
      refreshPromise
    }
  }
}

const bnetApi = new API()

bnetApi.loadTokens()

export { bnetApi }
