import { connect } from 'react-redux'
import actions from '../../../../../actions'

import ClassSelectWrapper from './class-select-wrapper'

const ConnectedClassSelectWrapper = connect(
  (state, props) => {
    const selection = state.userData.selections && state.userData.selections[props.name]
    const { class: selectedClass, spec: selectedSpec } = (selection && selection.selected) || {}

    let showSelectedClassWarning = false
    if (selectedClass) {
      const selectedClassMaxLevelCharacters = state.userData.profile.characters
        .filter(c => c.class === selection.selected.class)
        .filter(c => c.level === 110)
      showSelectedClassWarning = selectedClassMaxLevelCharacters.length === 0
    }

    return {
      selectedClass: selectedClass,
      selectedSpec: selectedSpec,
      comments: selection && selection.comments,
      showSelectedClassWarning
    }
  },
  (dispatch, props) => ({
    onChange: (property, newValue) => dispatch(actions.userData.changeSelection(props.name, property, newValue))
  })
)(ClassSelectWrapper)

export default ConnectedClassSelectWrapper
