import { connect } from 'react-redux'
import actions from '../../../../../redux/actions'
import { ApplicationState } from '../../../../../redux/reducers'

import ClassSelectWrapper, { NoneableLockSelectionChoice } from './class-select-wrapper'

interface StateProps {
  selectedClass?: string
  selectedSpec?: string
  comments?: string
  showSelectedClassWarning: boolean
  isLocked: boolean
  lockedChoice: NoneableLockSelectionChoice
}

interface DispatchProps {
  onChange: (property: string, newValue: string) => any
}

interface OwnProps {
  description: string
  name: string
}

interface UndefinedSelected {
  class: undefined
  spec: undefined
}

const ConnectedClassSelectWrapper = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  (state: ApplicationState, props: OwnProps) => {
    const selection = state.userData.selections && state.userData.selections[props.name]
    const selected = selection || ({} as UndefinedSelected)
    const { class: selectedClass, spec: selectedSpec } = selected

    let showSelectedClassWarning = false
    const profileCharacters = (state.userData.profile && state.userData.profile.characters) || []

    if (selectedClass) {
      const selectedClassMaxLevelCharacters = profileCharacters
        .filter(c => c.class === selected.class)
        .filter(c => c.level >= 110)
      showSelectedClassWarning = selectedClassMaxLevelCharacters.length === 0
    }

    return {
      selectedClass: selectedClass,
      selectedSpec: selectedSpec,
      comments: selection && selection.comments,
      showSelectedClassWarning,
      isLocked: selection && selection.locked || false,
      lockedChoice: selection && selection.lockedChoice || 'none'
    }
  },
  (dispatch, props) => ({
    onChange: (property, newValue: string) => dispatch(actions.userData.changeSelection(props.name, property, newValue))
  })
)(ClassSelectWrapper)

export default ConnectedClassSelectWrapper
