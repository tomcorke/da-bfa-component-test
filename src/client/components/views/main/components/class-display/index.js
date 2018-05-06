import { connect } from 'react-redux'
import ClassDisplay from './class-display'

const guildFilter = (char) => {
  return (
    char.guild === 'Distinctly Average' &&
    char.realm === 'Silvermoon'
  )
}

const byLevelAndName = (a, b) => {
  if (b.level !== a.level) {
    return b.level - a.level
  }
  return b.name < a.name ? 1 : -1
}

const ConnectedClassDisplay = connect(
  state => ({
    guildCharacters: state.userData.profile.characters.filter(guildFilter).sort(byLevelAndName)
  })
)(ClassDisplay)

export default ConnectedClassDisplay
