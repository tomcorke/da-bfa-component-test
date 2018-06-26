export interface ConfigState {
  guild: string
  realm: string
  region: string
  userDataEndpoint: string
  bnetAuthEndpoint: string
  saveDataEndpoint: string
  getOverviewViewDataEndpoint: string
  adminDeletePlayerDataEndpoint: string
  adminLockSelectionsEndpoint: string
  adminUnlockSelectionsEndpoint: string
  getSummaryDataEndpoint: string

  mockData: any
  mockOverviewData: any
  mockUserData: any
  initialView?: string
}

const config = require(`./${process.env.NODE_ENV}`).default as ConfigState

export default config
