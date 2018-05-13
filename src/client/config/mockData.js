const mockProfileData = {
  'TestUser#123': {
    characters: [
      {
        'name': 'Wowowowo',
        'level': 110,
        'class': 'shaman',
        'guild': 'Above Average',
        'realm': 'Silvermoon'
      },
      {
        'name': 'Zuun',
        'level': 110,
        'class': 'deathknight',
        'guild': 'Metanoia',
        'realm': 'Ravencrest'
      },
      {
        'name': 'Fapfap',
        'level': 110,
        'class': 'druid',
        'guild': 'Distinctly Average',
        'realm': 'Silvermoon'
      }
    ]
  },
  'BattleTag#999': {
    characters: [
      {
        name: 'Testtesttest',
        level: 110,
        class: 'mage',
        realm: 'Emerald Dream'
      }
    ]
  }
}

const getProfiles = () => {
  try {
    const profiles = require('./profiles.json')
    return {
      ...profiles,
      ...mockProfileData
    }
  } catch (err) {}
  return mockProfileData
}

const mockData = {
  initialView: 'overview',
  mockOverviewData: {
    userSelectionData: {
      'Shot#2975': {
        first: {
          selected: {
            class: 'deathknight',
            spec: 'blood'
          }
        },
        second: {
          selected: {
            class: 'demonhunter',
            spec: ''
          },
          comments: 'test comments longer and longer comments. Some people might write an essay in here, you never know.'
        },
        third: {
          selected: {
            class: 'priest',
            spec: 'holy'
          }
        }
      },
      'TestUser#123': {
        first: {
          selected: {
            class: 'shaman',
            spec: 'enhancement'
          },
          comments: 'test comments'
        },
        second: {
          selected: {
            class: 'druid',
            spec: 'restoration'
          }
        }
      },
      'BattleTag#999': {
        first: {
          selected: {
            class: 'deathknight',
            spec: 'blood'
          },
          comments: 'test comments'
        },
        third: {
          selected: {
            class: 'mage',
            spec: 'havoc'
          },
          comments: 'test comments'
        }
      }
    },
    userProfileData: getProfiles()
  },

  mockUserData: {
    user: {
      battletag: 'Shot#2975'
    },
    selections: {},
    profile: {
      characters: [
        {
          name: 'TestCharacter A',
          class: 'demonhunter',
          level: 110,
          guild: 'Distinctly Average',
          realm: 'Silvermoon'
        },
        {
          name: 'TestCharacter B',
          class: 'warrior',
          level: 120,
          guild: 'Distinctly Average',
          realm: 'Silvermoon'
        },
        {
          name: 'TestCharacter2',
          class: 'priest',
          level: 120,
          guild: 'Just Awful',
          realm: 'Silvermoon'
        }
      ]
    },
    isAdmin: true,
    isSuperAdmin: true
  }
}

export default mockData
