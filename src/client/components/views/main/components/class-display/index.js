import { connect } from 'react-redux'
import ClassDisplay from './class-display'

const guildFilter = (guild, realm) => (char) => {
  return (
    char.guild === guild &&
    char.realm === realm
  )
}

const byLevelAndName = (a, b) => {
  if (b.level !== a.level) {
    return b.level - a.level
  }
  return b.name < a.name ? 1 : -1
}

const ConnectedClassDisplay = connect(
  state => {
    const characters = (
      state.userData.profile && state.userData.profile.characters
    ) || []

    return {
      guildCharacters: characters
        .filter(guildFilter(state.config.guild, state.config.realm))
        .sort(byLevelAndName)
    }
  }
)(ClassDisplay)

export default ConnectedClassDisplay
