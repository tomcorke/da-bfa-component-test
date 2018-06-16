import * as React from 'react'

import { WowRoleTag } from '../../../types/classes'

import * as STYLES from './role-icon.scss'

interface RoleIconProps {
  role?: WowRoleTag
}

const RoleIcon = ({ role }: RoleIconProps) => {
  return <div className={STYLES.roleIcon} data-role={role} />
}

export default RoleIcon
