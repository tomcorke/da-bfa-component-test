import commonConfig from './common'

const config = {
  ...commonConfig,

  userDataEndpoint: 'user/get',
  bnetAuthEndpoint: 'auth/bnet',
  saveDataEndpoint: 'user/save',

  getOverviewViewDataEndpoint: 'overview/get',

  adminDeletePlayerDataEndpoint: 'user/delete'
}

export default config
