export interface CommonConfig {
  guild: string
  realm: string
  region: string
}

export const commonConfig: CommonConfig = {
  guild: 'Distinctly Average',
  realm: 'Silvermoon',
  region: 'EU'
}

export interface Endpoints {
  userDataEndpoint: string
  bnetAuthEndpoint: string
  saveDataEndpoint: string
  getOverviewViewDataEndpoint: string
  adminDeletePlayerDataEndpoint: string
  adminLockSelectionsEndpoint: string
  adminUnlockSelectionsEndpoint: string
  getSummaryDataEndpoint: string
  setDisplayNameEndpoint: string
  getAuditDataEndpoint: string
}

export const getEndpoints = (baseUrl: string): Endpoints => ({
  userDataEndpoint: `${baseUrl}user/get`,
  bnetAuthEndpoint: `${baseUrl}auth/bnet`,
  saveDataEndpoint: `${baseUrl}user/save`,

  getOverviewViewDataEndpoint: `${baseUrl}overview/get`,

  adminDeletePlayerDataEndpoint: `${baseUrl}user/delete`,

  adminLockSelectionsEndpoint: `${baseUrl}selections/lock`,
  adminUnlockSelectionsEndpoint: `${baseUrl}selections/unlock`,

  getSummaryDataEndpoint: `${baseUrl}summary/get`,

  setDisplayNameEndpoint: `${baseUrl}overview/setDisplayName`,

  getAuditDataEndpoint: `${baseUrl}audit/get`
})
