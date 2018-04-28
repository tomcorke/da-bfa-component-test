const config = {
  userDataEndpoint: 'https://localhost:3443/getUserData',
  bnetAuthEndpoint: 'https://localhost:3443/auth/bnet',
  saveDataEndpoint: 'https://localhost:3443/save',

  getOverviewViewDataEndpoint: 'https://localhost:3443/getOverviewViewData',

  forceView: 'overview',
  mockViewData: {
    overview: {
      'Shot#2975': {
        first: {
          selected: {
            class: 'deathknight',
            spec: 'blood'
          },
          comments: 'test comments'
        },
        second: {
          selected: {
            class: 'demonhunter',
            spec: 'havoc'
          },
          comments: 'test comments'
        },
        third: {
          selected: {
            class: 'paladin',
            spec: 'holy'
          },
          comments: 'test comments'
        }
      },
      'NotShot#2975': {
        first: {
          selected: {
            class: 'deathknight',
            spec: 'blood'
          },
          comments: 'test comments'
        },
        second: {
          selected: {
            class: 'demonhunter',
            spec: 'havoc'
          },
          comments: 'test comments'
        },
        third: {
          selected: {
            class: 'paladin',
            spec: 'holy'
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

export default config
