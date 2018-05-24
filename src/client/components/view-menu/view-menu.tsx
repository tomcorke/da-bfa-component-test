import * as React from 'react'

import SmallButton from '../small-button'

import * as STYLES from './view-menu.scss'

const menuItems = [
  { name: 'main', text: 'Main' },
  { name: 'overview', text: 'Overview', admin: true },
  { name: 'export', text: 'Export', admin: true }
]

interface ViewMenuProps {
  view: string
  isAdmin: boolean
  changeView: (view: string) => any
}

const ViewMenu = ({ view, isAdmin = false, changeView }: ViewMenuProps) => {
  const menuItemsToDisplay = menuItems
    .filter(item => !item.admin || isAdmin)
    .map(item => (
      <div key={item.name} className={STYLES.item}>
        <SmallButton onClick={() => changeView(item.name)} active={item.name === view}>{item.text}</SmallButton>
      </div>
    ))

  return (
    <div className={STYLES.viewMenu}>
      {menuItemsToDisplay.length > 1 && menuItemsToDisplay}
    </div>
  )
}

export default ViewMenu
