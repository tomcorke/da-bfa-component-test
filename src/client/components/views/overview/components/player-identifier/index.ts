import { connect } from 'react-redux'

import PlayerIdentifier from './player-identifier'
import { ApplicationState } from '../../../../../redux/reducers'
import { APIPlayerCharacter } from '../../../../../../types/api'
import config from '../../../../../config'

interface OwnProps {
  battletag: string
}

const filterByGuild = (guild, realm) =>
  char => char.guild === guild && char.realm === realm
const sortByLevelAndName = (a, b) =>
  (a.level > b.level || (a.level === b.level && a.name < b.name)) ? -1 : 1

const ConnectedPlayerIdentifier = connect(
  (state: ApplicationState, props: OwnProps) => {
    const playerData = state.overview.find(i => i.battletag === props.battletag) ||
      ({ characters: [] } as { characters: APIPlayerCharacter[] })
    return {
      guildCharacters: playerData.characters
      .filter(filterByGuild(config.guild, config.realm))
      .sort(sortByLevelAndName)
    }
  }
)(PlayerIdentifier)

export default ConnectedPlayerIdentifier
