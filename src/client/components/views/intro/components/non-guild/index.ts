import { connect } from 'react-redux'

import config from '../../../../../config'

import NonGuild from './non-guild'

const ConnectedNonGuild = connect(
  () => ({
    guild: config.guild,
    realm: config.realm,
    region: config.region
  })
)(NonGuild)

export default ConnectedNonGuild
