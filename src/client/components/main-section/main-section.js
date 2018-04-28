import React from 'react'

import Section from '../section'
import ClassSelectWrapper from '../class-select-wrapper'
import ClassSelect from '../class-select'
import CommentsBox from '../comments-box'
import Button from '../button'
import LoginPrompt from '../login-prompt'
import FeedbackMessage from '../feedback-message'
import ClassDisplay from '../class-display'

import STYLES from './main-section.scss'

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

  isLoggedIn,
  hasProfile,
  hasCharacters,
  hasCharactersInGuild,

  gettingUserData,

  onChoiceChanged,
  hasChanges,

  onLoginClick,
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

  let classDisplay = null
  if (isLoggedIn && hasCharactersInGuild) {
    classDisplay = <ClassDisplay characters={profile.characters} />
  } else if (isLoggedIn && !hasCharacters) {
    classDisplay = <p className={STYLES.warning}>Could not load your characters, please refresh the page to attempt to re-load them</p>
  }

  let nonGuildDisplay = null
  if (isLoggedIn && !hasCharactersInGuild) {
    nonGuildDisplay = <p className={STYLES.warning}>This site is intended only for members of &lt;Distinctly Average&gt; on Silvermoon (EU). If you are joining the guild for Battle for Azeroth please contact an officer to have at least one character added to the guild before using this site.</p>
  }

  let mainDisplay = []
  if (isLoggedIn) {
    mainDisplay = nonGuildDisplay ||
      [
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
  } else {
    mainDisplay = <LoginPrompt onLoginClick={onLoginClick} disableLogin={gettingUserData} />
  }

  return (
    <Section type='main'>
      <p>
        Welcome to class selection! We're releasing this a little early so you can get to grips with this page, and we can get an idea who is looking at what for the expansion! - Any problems and we'll contact you directly! Have fun!
      </p>

      {classDisplay}

      {mainDisplay}

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
