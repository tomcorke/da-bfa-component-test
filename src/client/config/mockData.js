const mockData = {
  forceView: 'overview',
  mockViewData: {
    overview: {
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
      'NotShot#2975': {
        first: {
          selected: {
            class: 'deathknight',
            spec: ''
          },
          comments: 'test comments'
        },
        second: {
          selected: {
            class: 'demonhunter',
            spec: 'havoc'
          }
        }
      },
      'NotShot#297522': {
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
    }
  },

  mockUserData: {
    user: {
      battletag: 'Shot#2975',
      id: 999,
      provider: 'bnet',
      token: 'abcd'
    },
    data: {},
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
    isAdmin: true
  }
}

export default mockData
