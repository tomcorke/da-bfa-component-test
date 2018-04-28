import React from 'react'

import ClassSelectWrapper from '../../class-select-wrapper'
import Button from '../../button'
import LoginPrompt from '../../login-prompt'
import ClassDisplay from '../../class-display'

import STYLES from './main.scss'

const getBlurb = (name) => {
  return ({
    first: 'Main choice:',
    second: 'Alt choice:',
    third: 'Backup choice:'
  })[name]
}

const MainView = ({
  user,
  data,
  profile,
  gettingUserData,
  isLoggedIn,
  hasCharacters,
  hasCharactersInGuild,
  hasChanges,
  onSaveClick,
  onLoginClick,
  onChoiceChanged
}) => {
  const createClassSelectWrapper = (name) => {
    return (
      <ClassSelectWrapper
        key={name}
        name={name}
        data={data[name]}
        profile={profile}
        description={getBlurb(name)}
        onChange={onChoiceChanged} />
    )
  }

  let loadingDisplay = null
  if (isLoggedIn && gettingUserData) {
    loadingDisplay = <p key='loading' className={STYLES.info}>Getting characters...</p>
  }

  let classDisplay = null
  if (isLoggedIn && hasCharactersInGuild) {
    classDisplay = <ClassDisplay key='class-display' characters={profile.characters} />
  } else if (isLoggedIn && !hasCharacters) {
    classDisplay = <p key='load-fail' className={STYLES.warning}>Could not load your characters, please refresh the page to attempt to re-load them</p>
  }

  let nonGuildDisplay = null
  if (isLoggedIn && !hasCharactersInGuild) {
    nonGuildDisplay = <p key='non-guild' className={STYLES.warning}>This site is intended only for members of &lt;Distinctly Average&gt; on Silvermoon (EU). If you are joining the guild for Battle for Azeroth please contact an officer to have at least one character added to the guild before using this site.</p>
  }

  let mainDisplay = []
  if (isLoggedIn) {
    mainDisplay = nonGuildDisplay ||
      [
        createClassSelectWrapper('first'),
        createClassSelectWrapper('second'),
        createClassSelectWrapper('third'),
        <Button
          key='save'
          type='save'
          text='Save your selections'
          onClick={() => onSaveClick()}
          highlight={hasChanges} />
      ]
  } else {
    mainDisplay = <LoginPrompt key='login-prompt' onLoginClick={onLoginClick} disableLogin={gettingUserData} />
  }

  return (
    <React.Fragment>
      <p>
        Welcome to class selection! We're releasing this a little early so you can get to grips with this page, and we can get an idea who is looking at what for the expansion! - Any problems and we'll contact you directly! Have fun!
      </p>

      {loadingDisplay || [
        classDisplay,
        mainDisplay
      ]}
    </React.Fragment>
  )
}

export default MainView
