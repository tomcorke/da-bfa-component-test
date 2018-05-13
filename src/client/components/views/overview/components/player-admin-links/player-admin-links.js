import React from 'react'

import STYLES from './player-admin-links.scss'

const PlayerAdminLinks = ({ isAdmin, isSuperAdmin, onDeleteClick }) => {
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
