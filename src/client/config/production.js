import commonConfig from './common'

const config = {
  ...commonConfig,

  userDataEndpoint: 'getUserData',
  bnetAuthEndpoint: 'auth/bnet',
  saveDataEndpoint: 'save',

  getOverviewViewDataEndpoint: 'getOverviewViewData'
}

export default config
