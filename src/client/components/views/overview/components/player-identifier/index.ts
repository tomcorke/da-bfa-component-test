import { connect } from 'react-redux'

import PlayerIdentifier from './player-identifier'
import { ApplicationState } from '../../../../../reducers'

interface OwnProps {
  battletag: string
}

const filterByGuild = (guild, realm) =>
  char => char.guild === guild && char.realm === realm
const sortByLevelAndName = (a, b) =>
  (a.level > b.level || (a.level === b.level && a.name < b.name)) ? -1 : 1

const ConnectedPlayerIdentifier = connect(
  (state: ApplicationState, props: OwnProps) => ({
    guildCharacters: state.overview.find(i => i.battletag === props.battletag).characters
      .filter(filterByGuild(state.config.guild, state.config.realm))
      .sort(sortByLevelAndName)
  })
)(PlayerIdentifier)

export default ConnectedPlayerIdentifier
