import mockData from './mockData'

const config = {
  userDataEndpoint: 'https://localhost:3443/getUserData',
  bnetAuthEndpoint: 'https://localhost:3443/auth/bnet',
  saveDataEndpoint: 'https://localhost:3443/save',

  getOverviewViewDataEndpoint: 'https://localhost:3443/getOverviewViewData',

  ...mockData
}

export default config
