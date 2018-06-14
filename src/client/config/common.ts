export const commonConfig = {
  guild: 'Distinctly Average',
  realm: 'Silvermoon',
  region: 'EU'
}

export const getEndpoints = (baseUrl) => ({
  userDataEndpoint: `${baseUrl}user/get`,
  bnetAuthEndpoint: `${baseUrl}auth/bnet`,
  saveDataEndpoint: `${baseUrl}user/save`,

  getOverviewViewDataEndpoint: `${baseUrl}overview/get`,

  adminDeletePlayerDataEndpoint: `${baseUrl}user/delete`,

  adminLockSelectionsEndpoint: `${baseUrl}selections/lock`,
  adminUnlockSelectionsEndpoint: `${baseUrl}selections/unlock`
})
