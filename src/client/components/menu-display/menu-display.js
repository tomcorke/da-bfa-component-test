import React from 'react'

import SmallButton from '../small-button'

import STYLES from './menu-display.scss'

const menuItems = [
  { name: 'permissions', text: 'Permissions', permissions: ['superadmin'] },
  { name: 'view-data', text: 'View Data', permissions: ['superadmin'] },
  { name: 'export', text: 'Export', permissions: ['superadmin'] }
]

const MenuDisplay = ({ permissions = [], onClick }) => {
  return (
    <div className={STYLES.menuDisplay}>
      {
        menuItems
          .filter(item => permissions.includes('superadmin') || item.permissions.every(p => permissions.includes(p)))
          .map(item => (
            <div key={item.name} className={STYLES.item}>
              <SmallButton onClick={() => onClick(item.name)}>{item.text}</SmallButton>
            </div>
          ))
      }
    </div>
  )
}

export default MenuDisplay
