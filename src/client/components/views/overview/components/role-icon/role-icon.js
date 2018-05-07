import React from 'react'

import STYLES from './role-icon.scss'

const RoleIcon = ({ role }) => {
  return <div className={STYLES.roleIcon} data-role={role} />
}

export default RoleIcon
