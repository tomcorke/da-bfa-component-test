import { getEndpoints, Endpoints } from './common'

const config: Endpoints = {
  // ...require('./mockData').default,
  ...getEndpoints('https://localhost:3443/')
}

export default config
