import { connect } from 'react-redux'
import actions from '../../../../../redux/actions'

import PlayerAdminLinks, { PlayerAdminLinksProps } from './player-admin-links'
import { ApplicationState, Dispatch } from '../../../../../redux/reducers'

interface OwnProps {
  battletag: string
}

const ConnectedPlayerAdminLinks = connect(
  (state: ApplicationState) => ({
    isAdmin: state.userData.isAdmin,
    isSuperAdmin: state.userData.isSuperAdmin
  }),
  (dispatch: Dispatch, props: OwnProps) => ({
    onDeleteClick: () => dispatch(actions.admin.deletePlayerData(props.battletag))
  })
)(PlayerAdminLinks)

export default ConnectedPlayerAdminLinks
