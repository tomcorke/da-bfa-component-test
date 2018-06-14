import { connect } from 'react-redux'
import actions from '../../redux/actions'

import { ApplicationState, Dispatch } from '../../redux/reducers'
import { View } from '../../redux/reducers/views'

import ViewMenu from './view-menu'

const ConnectedViewMenu = connect(
  (state: ApplicationState) => ({
    view: state.view,
    isAdmin: state.userData.isAdmin
  }),
  (dispatch: Dispatch) => ({
    changeView: (newView: View) => dispatch(actions.views.changeView(newView))
  })
)(ViewMenu)

export default ConnectedViewMenu
