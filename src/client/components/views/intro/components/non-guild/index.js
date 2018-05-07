import { connect } from 'react-redux'

import NonGuild from './non-guild'

const ConnectedNonGuild = connect(
  state => ({
    guild: state.config.guild,
    realm: state.config.realm,
    region: state.config.region
  })
)(NonGuild)

export default ConnectedNonGuild
