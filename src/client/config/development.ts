import commonConfig from './common'

const config = {
  ...commonConfig,

  ...require('./mockData').default,

  userDataEndpoint: 'https://localhost:3443/getUserData',
  bnetAuthEndpoint: 'https://localhost:3443/auth/bnet',
  saveDataEndpoint: 'https://localhost:3443/save',

  getOverviewViewDataEndpoint: 'https://localhost:3443/getOverviewViewData',

  adminDeletePlayerDataEndpoint: 'https://localhost:3443/deletePlayerData'
}

export default config
