import request from 'request-promise-native'

const createUrl = (endpoint, token) => {
  const BASE_URL = `https://eu.api.battle.net`
  return `${BASE_URL}${endpoint}?access_token=${encodeURIComponent(token)}`
}

const profileCache = {}
const requestCache = {}

const guildCharFilter = (char) => {
  return (
    char.guild === 'Distinctly Average' &&
    char.guildRealm === 'Silvermoon'
  )
}

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

const charTransform = (char) => {
  return {
    name: char.name,
    level: char.level,
    class: CLASS_NAMES[char.class]
  }
}

const api = {
  getWoWProfile: async (user) => {
    const url = createUrl('/wow/user/characters', user.token)

    let getProfile = requestCache[user.battletag]

    if (!getProfile) {
      getProfile = request(url, { json: true })
        .then(data => {
          if (data) {
            return {
              ...data,
              characters: data.characters.filter(guildCharFilter).map(charTransform)
            }
          }
        })
        .catch(err => console.error(`Error getting wow profile data for "${user.battletag}": ${err.message}`))

      getProfile
        .then(data => { data && (profileCache[user.battletag] = data) })

      const removeFromRequestCache = () => { requestCache[user.battletag] = null }
      getProfile
        .then(removeFromRequestCache, removeFromRequestCache)

      requestCache[user.battletag] = getProfile
    }

    if (profileCache[user.battletag]) {
      console.log(`Returning cached wow profile data for "${user.battletag}"`)
      return profileCache[user.battletag]
    }

    return getProfile
  }
}

export default api
