import { connect } from "react-redux";

import actions from "../../../../../redux/actions";
import { ApplicationState, Dispatch } from "../../../../../redux/reducers";

import PlayerAdminLinks from "./player-admin-links";

interface OwnProps {
  battletag: string;
}

const ConnectedPlayerAdminLinks = connect(
  (state: ApplicationState, props: OwnProps) => {
    const playerOverview = state.overview.find(
      o => o.battletag === props.battletag
    );
    const playerCharacters =
      (playerOverview && playerOverview.characters) || [];
    return {
      isAdmin: state.userData.isAdmin,
      isSuperAdmin: state.userData.isSuperAdmin,
      playerCharacters
    };
  },
  (dispatch: Dispatch, props: OwnProps) => ({
    onChangeDisplayedCharacter: (name: string) =>
      dispatch(
        actions.overview.setOverviewDisplayedName(props.battletag, name)
      ),
    onDeleteClick: () =>
      dispatch(actions.admin.deletePlayerData(props.battletag))
  })
)(PlayerAdminLinks);

export default ConnectedPlayerAdminLinks;
