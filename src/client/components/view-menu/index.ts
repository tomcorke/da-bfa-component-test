import { connect } from 'react-redux'
import actions from '../../actions'

import { ApplicationState } from '../../reducers'

import ViewMenu from './view-menu'

const ConnectedViewMenu = connect(
  (state: ApplicationState) => ({
    view: state.view,
    isAdmin: state.userData.isAdmin
  }),
  (dispatch) => ({
    changeView: (newView: string) => dispatch(actions.views.changeView(newView))
  })
)(ViewMenu)

export default ConnectedViewMenu
