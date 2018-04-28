import React from 'react'

import Section from '../section'
import ClassSelectWrapper from '../class-select-wrapper'
import ClassSelect from '../class-select'
import CommentsBox from '../comments-box'
import Button from '../button'
import LoginPrompt from '../login-prompt'
import FeedbackMessage from '../feedback-message'

const getBlurb = (name) => {
  return ({
    first: 'Main choice:',
    second: 'Alt choice:',
    third: 'Backup choice:'
  })[name]
}

const MainSection = ({
  data,
  user,
  profile,
  onChoiceChanged,
  hasChanges,
  onLoginClick,
  gettingUserData,
  onSaveClick,
  showFeedbackMessage,
  feedbackMessage,
  fadeOutFeedbackMessage,
  onFeedbackMessageClick
}) => {
  const createClassSelect = (name) => {
    const onChange = (value) => onChoiceChanged(name, 'selected', value)
    const choice = data[name] || {}
    return <ClassSelect onChange={onChange} value={choice.selected} />
  }

  const createCommentsBox = (name) => {
    const onChange = (value) => onChoiceChanged(name, 'comments', value)
    const choice = data[name] || {}
    return <CommentsBox onChange={onChange} value={choice.comments} />
  }

  const createClassElements = (name) => {
    return (
      <ClassSelectWrapper key={name} description={getBlurb(name)}>
        { createClassSelect(name) }
        { createCommentsBox(name) }
      </ClassSelectWrapper>
    )
  }

  return (
    <Section type='main'>
      <p>
        Welcome to class selection! We're releasing this a little early so you can get to grips with this page, and we can get an idea who is looking at what for the expansion! - Any problems and we'll contact you directly! Have fun!
      </p>
      {user
        ? (profile
          ? null // <p>Profile loaded</p>
          : <p>Could not load your characters, refresh the page to attempt to re-load them</p>)
        : null
      }
      {user
        ? [
          createClassElements('first'),
          createClassElements('second'),
          createClassElements('third'),
          <Button
            key='save'
            type='save'
            text='Save your selections'
            onClick={() => onSaveClick()}
            highlight={hasChanges} />
        ]
        : <LoginPrompt onLoginClick={onLoginClick} disableLogin={gettingUserData} />
      }
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
