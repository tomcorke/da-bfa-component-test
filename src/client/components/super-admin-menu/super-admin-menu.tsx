import * as React from 'react'

import * as STYLES from './super-admin-menu.scss'

import SmallButton from '../small-button'

interface BattletagAndName {
  battletag: string
  name?: string
}

interface SuperAdminMenuProps {
  assumedIdentity?: string
  assumeIdentity: (battletag: string) => any
  unassumeIdentity: () => any
  identities: BattletagAndName[]
}

const SuperAdminMenu = ({
  assumedIdentity,
  assumeIdentity,
  unassumeIdentity,
  identities
}: SuperAdminMenuProps) => {

  const identityOptions = identities
    .map(i => <option key={i.battletag} value={i.battletag}>{i.name ? `${i.battletag} (${i.name})` : i.battletag}</option>)

  return (
    <div className={STYLES.superAdminMenu}>
      <div className={STYLES.header}>Super admin menu!</div>
      <ul className={STYLES.menu}>
        {assumedIdentity
          ? <li>
              <SmallButton onClick={unassumeIdentity}>
                Assuming identity of {assumedIdentity}, click to clear
              </SmallButton>
            </li>
          : <li>Assume a player's identity:
              <select onChange={(e) => assumeIdentity(e.target.value)}>
                <option></option>
                {identityOptions}
              </select>
            </li>
        }
      </ul>
    </div>
  )
}

export default SuperAdminMenu
