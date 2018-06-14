import { commonConfig, getEndpoints } from './common'

const config = {
  ...commonConfig,

  // ...require('./mockData').default,

  ...getEndpoints('https://localhost:3443/')
}

export default config
