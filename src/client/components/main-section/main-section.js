import React from 'react'

import Section from '../section'
import FeedbackMessage from '../feedback-message'

import ViewMenu from '../view-menu'

import IntroView from '../views/intro'
import MainView from '../views/main'
import OverviewView from '../views/overview'
import ExportView from '../views/export'

const MainSection = (props) => {
  const {
    view,
    isAdmin,

    onViewMenuClick,

    feedbackMessage,
    showFeedbackMessage,
    fadeOutFeedbackMessage,
    onFeedbackMessageClick
  } = props

  const viewDisplay = {
    main: () => <MainView {...props} />,
    overview: () => <OverviewView {...props} />,
    export: () => <ExportView {...props} />
  }[view]()

  return (
    <Section type='main'>

      <ViewMenu view={view} isAdmin={isAdmin} onClick={onViewMenuClick} />

      {viewDisplay}

      {showFeedbackMessage
        ? <FeedbackMessage
          message={feedbackMessage}
          fadeout={fadeOutFeedbackMessage}
          onClick={onFeedbackMessageClick} />
        : null}
    </Section>
  )
}

export default MainSection
