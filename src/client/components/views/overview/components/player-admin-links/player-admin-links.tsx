import * as React from 'react'

import * as STYLES from './player-admin-links.scss'

export interface PlayerAdminLinksProps {
  isAdmin: boolean
  isSuperAdmin: boolean
  onDeleteClick: () => void
}

const PlayerAdminLinks = ({ isAdmin, isSuperAdmin, onDeleteClick }: PlayerAdminLinksProps) => {
  const adminLinks = [
    // () => <span key='lockin' className={STYLES.adminLinkLockIn}>lock in</span>
  ]
  const superAdminLinks = [
    () => <span key='delete' onClick={onDeleteClick} className={STYLES.adminLinkDelete}>delete</span>
  ]

  return (
    <div className={STYLES.playerAdminLinks}>
      {isAdmin && adminLinks.map(link => link())}
      {isSuperAdmin && superAdminLinks.map(link => link())}
    </div>
  )
}

export default PlayerAdminLinks
