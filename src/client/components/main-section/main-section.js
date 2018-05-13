import React from 'react'

import Section from '../section'

import ViewMenu from '../view-menu'

import IntroView from '../views/intro'
import MainView from '../views/main'
import OverviewView from '../views/overview'
import ExportView from '../views/export'

const MainSection = ({ view }) => {
  const View = {
    intro: IntroView,
    main: MainView,
    overview: OverviewView,
    export: ExportView
  }[view]

  return (
    <Section type='main'>

      <ViewMenu />

      <View />

    </Section>
  )
}

export default MainSection
