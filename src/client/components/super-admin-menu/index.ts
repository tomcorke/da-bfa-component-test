import { connect } from 'react-redux'

import SuperAdminMenu from './super-admin-menu'

import * as viewActions from '../../redux/actions/views'
import * as adminActions from '../../redux/actions/admin'

import { ApplicationState, Dispatch } from '../../redux/reducers'

const ConnectedSuperAdminMenu = connect(
  (state: ApplicationState) => ({
    assumedIdentity: state.admin.assumedIdentity,
    identities: state.overview.map(o => ({ battletag: o.battletag, name: o.displayName }))
  }),
  (dispatch: Dispatch) => ({
    assumeIdentity: (battletag: string) => {
      dispatch(adminActions.assumePlayerIdentity(battletag))
      dispatch(viewActions.changeView('main'))
    },
    unassumeIdentity: () => dispatch(adminActions.unassumePlayerIdentity())
  })
)(SuperAdminMenu)

export default ConnectedSuperAdminMenu
