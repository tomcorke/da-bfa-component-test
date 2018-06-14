import { commonConfig, getEndpoints } from './common'

const config = {
  ...commonConfig,
  ...getEndpoints('')
}

export default config
