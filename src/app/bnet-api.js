import request from 'request-promise-native'
import { DB } from './db'

const createUrl = (endpoint, token) => {
  const BASE_URL = `https://eu.api.battle.net`
  return `${BASE_URL}${endpoint}?access_token=${encodeURIComponent(token)}`
}

const profileDb = new DB('profiles')
const requestCache = {}

const CLASS_NAMES = {
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

const charFilter = (char) => {
  return (
    char.realm &&
    char.level >= 10
  )
}

const charTransform = (char) => {
  return {
    name: char.name,
    level: char.level,
    class: CLASS_NAMES[char.class],
    guild: char.guild,
    realm: char.realm
  }
}

const api = {
  getWoWProfile: async (user, immediate = false) => {
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

      const removeFromRequestCache = () => { requestCache[user.battletag] = null }
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
}

export default api
