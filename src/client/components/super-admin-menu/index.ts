import { connect } from "react-redux";

import * as adminActions from "../../redux/actions/admin";
import * as viewActions from "../../redux/actions/views";
import { ApplicationState, Dispatch } from "../../redux/reducers";

import SuperAdminMenu from "./super-admin-menu";

const ConnectedSuperAdminMenu = connect(
  (state: ApplicationState) => ({
    assumedIdentity: state.admin.assumedIdentity,
    identities: state.overview.map(o => ({
      battletag: o.battletag,
      name: o.displayName
    }))
  }),
  (dispatch: Dispatch) => ({
    assumeIdentity: (battletag: string) => {
      dispatch(adminActions.assumePlayerIdentity(battletag));
      dispatch(viewActions.changeView("main"));
    },
    unassumeIdentity: () => dispatch(adminActions.unassumePlayerIdentity())
  })
)(SuperAdminMenu);

export default ConnectedSuperAdminMenu;
