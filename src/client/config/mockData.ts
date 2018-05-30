const mockProfileData = {
}

const mockSelectionData = {
}

const getSelections = () => {
  try {
    const selections = require('../../../db/data.json')
    return {
      ...selections,
      ...mockSelectionData
    }
  } catch (err) {
    // this is fine
  }
  return mockSelectionData
}

const getProfiles = () => {
  try {
    const profiles = require('../../../db/profiles.json')
    return {
      ...profiles,
      ...mockProfileData
    }
  } catch (err) {
    // This is fine
  }
  return mockProfileData
}

const getUserData = () => ({
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
})

const mockData = {
  initialView: 'overview',
  mockOverviewData: {
    userSelectionData: getSelections(),
    userProfileData: getProfiles()
  },
  mockUserData: getUserData()
}

export default mockData
