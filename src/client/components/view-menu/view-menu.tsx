import * as React from "react";

import SmallButton from "../small-button";

import * as STYLES from "./view-menu.scss";
import { View } from "../../redux/reducers/views";

interface MenuItemProps {
  name: View;
  text: string;
  requireLoggedIn?: boolean;
  requireGuild?: boolean;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

const menuItems: MenuItemProps[] = [
  { name: "main", text: "Your Selections", requireGuild: true },
  { name: "overview", text: "Overview", requireAdmin: true },
  { name: "summary", text: "Raid View", requireGuild: true },
  { name: "audit", text: "Audit Log", requireSuperAdmin: true }
];

interface ViewMenuProps {
  view: View;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  hasCharactersInGuild: boolean;
  changeView: (view: View) => any;
}

const ViewMenu = ({
  view,
  isLoggedIn = false,
  isAdmin = false,
  isSuperAdmin = false,
  hasCharactersInGuild = false,
  changeView
}: ViewMenuProps) => {
  const menuItemsToDisplay = menuItems
    .filter(item => {
      const requireAdmin = item.requireSuperAdmin || item.requireAdmin;
      const requireGuild = requireAdmin || item.requireGuild;
      const requireLoggedIn = requireGuild || item.requireLoggedIn;
      return (
        isSuperAdmin ||
        (!item.requireSuperAdmin && isAdmin) ||
        (!requireAdmin && hasCharactersInGuild) ||
        (!requireGuild && isLoggedIn) ||
        !requireLoggedIn
      );
    })
    .map(item => (
      <div key={item.name} className={STYLES.item}>
        <SmallButton
          onClick={() => changeView(item.name)}
          active={item.name === view}
        >
          {item.text}
        </SmallButton>
      </div>
    ));

  return <div className={STYLES.viewMenu}>{menuItemsToDisplay}</div>;
};

export default ViewMenu;
