import { connect } from 'react-redux'
import actions from '../../../../../actions'

import PlayerAdminLinks from './player-admin-links'

const ConnectedPlayerAdminLinks = connect(
  state => ({
    isAdmin: state.userData.isAdmin,
    isSuperAdmin: state.userData.isSuperAdmin
  }),
  (dispatch, props) => ({
    onDeleteClick: () => dispatch(actions.admin.deletePlayerData(props.battletag))
  })
)(PlayerAdminLinks)

export default ConnectedPlayerAdminLinks
