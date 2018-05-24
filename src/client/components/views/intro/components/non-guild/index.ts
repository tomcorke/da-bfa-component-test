import { connect } from 'react-redux'

import { ApplicationState } from '../../../../../reducers'

import NonGuild from './non-guild'

const ConnectedNonGuild = connect(
  (state: ApplicationState) => ({
    guild: state.config.guild,
    realm: state.config.realm,
    region: state.config.region
  })
)(NonGuild)

export default ConnectedNonGuild
