const config = {
  userDataEndpoint: 'https://localhost:3443/getUserData',
  bnetAuthEndpoint: 'https://localhost:3443/auth/bnet',
  saveDataEndpoint: 'https://localhost:3443/save',

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
          name: 'TestCharacter',
          class: 'demonhunter',
          level: 120,
          guild: 'Distinctly Average',
          realm: 'Silvermoon'
        },
        {
          name: 'TestCharacter2',
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
    }
  }
}

export default config
