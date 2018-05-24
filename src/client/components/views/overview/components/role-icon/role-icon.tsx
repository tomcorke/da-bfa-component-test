import * as React from 'react'

import * as STYLES from './role-icon.scss'

interface RoleIconProps {
  role: string
}

const RoleIcon = ({ role }: RoleIconProps) => {
  return <div className={STYLES.roleIcon} data-role={role} />
}

export default RoleIcon
