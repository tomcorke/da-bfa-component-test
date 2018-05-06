import React from 'react'

import MainPretext from '../../main-pretext'
import ClassDisplay from './components/class-display'
import UserSelections from './components/user-selections'

import STYLES from './main.scss'

const MainView = () => (
  <div className={STYLES.mainView}>
    <MainPretext />
    <ClassDisplay />
    <UserSelections />
  </div>
)

export default MainView
