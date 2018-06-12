import commonConfig from './common'

const config = {
  ...commonConfig,

  ...require('./mockData').default,

  userDataEndpoint: 'https://localhost:3443/user/get',
  bnetAuthEndpoint: 'https://localhost:3443/auth/bnet',
  saveDataEndpoint: 'https://localhost:3443/user/save',

  getOverviewViewDataEndpoint: 'https://localhost:3443/overview/get',

  adminDeletePlayerDataEndpoint: 'https://localhost:3443/user/delete'
}

export default config
