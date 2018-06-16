import * as React from 'react'

import Section from '../section'

import ViewMenu from '../view-menu'

import IntroView from '../views/intro'
import MainView from '../views/main'
import OverviewView from '../views/overview'
import SummaryView from '../views/summary'
import { View } from '../../redux/reducers/views'

interface MainSectionProps {
  view: View
}

const MainSection = ({ view }: MainSectionProps) => {
  const View = {
    intro: IntroView,
    main: MainView,
    overview: OverviewView,
    summary: SummaryView
  }[view]

  return (
    <Section type='main'>

      <ViewMenu />

      <View />

    </Section>
  )
}

export default MainSection
