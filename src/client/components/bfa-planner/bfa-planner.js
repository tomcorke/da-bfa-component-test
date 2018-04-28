import React from 'react'

import Section from '../section'
import Divider from '../divider'
import Header from '../header'
import SubHeader from '../subheader'
import Footer from '../footer'
import MainSection from '../main-section'

import STYLES from './bfa-planner.scss'

const popupWindow = (url, win, w, h) => {
  var y = win.top.outerHeight / 2 + win.top.screenY - (h / 2)
  var x = win.top.outerWidth / 2 + win.top.screenX - (w / 2)
  return win.open(url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + y + ', left=' + x)
}

const guildFilter = c =>
  c.guild === 'Distinctly Average' &&
  c.realm === 'Silvermoon'

class BfaPlanner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
    this.receiveMessage = this.receiveMessage.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onChoiceChanged = this.onChoiceChanged.bind(this)
    this.onHideFeedbackMessage = this.onHideFeedbackMessage.bind(this)
  }

  handleUserData (userData) {
    const { user, data, profile } = userData

    const isLoggedIn = !!user
    const hasProfile = !!profile
    const hasCharacters = profile && profile.characters.length > 0
    const hasCharactersInGuild = profile && profile.characters.filter(guildFilter).length > 0

    this.setState({
      ...this.state,
      user,
      data: data || {},
      profile,
      hasChanges: false,
      isLoggedIn,
      hasProfile,
      hasCharacters,
      hasCharactersInGuild
    })
  }

  getUserData () {
    const {
      userDataEndpoint,
      mockUserData
    } = this.props.config

    if (mockUserData) {
      return this.handleUserData(mockUserData)
    }

    this.setState({
      ...this.state,
      gettingUserData: true
    })

    window.fetch(userDataEndpoint,
      {
        credentials: 'include'
      })
      .then(response => {
        if (response.status !== 200) {
          throw Error('Could not get user data')
        }
        return response.json()
      })
      .then(data => {
        console.log('getUserData', data)
        this.handleUserData(data)
      })
      .catch(err => console.error(err))
      .then(() => {
        this.setState({
          ...this.state,
          gettingUserData: false
        })
      })
  }

  onLogin () {
    const { bnetAuthEndpoint } = this.props.config
    const authUrl = bnetAuthEndpoint
    this.authWindow = popupWindow(authUrl, window, 450, 600)
  }

  onSave () {
    const xhr = new window.XMLHttpRequest()
    const { saveDataEndpoint } = this.props.config
    xhr.open('POST', saveDataEndpoint, true)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.setState({
          ...this.state,
          hasChanges: false
        })
        setImmediate(() => this.showFeedbackMessage('Saved!'))
      }
    }
    xhr.send(JSON.stringify(this.state.data))
  }

  receiveMessage (event) {
    if (event.source === this.authWindow) {
      console.log('Received message from auth window', event.data)
      this.handleUserData(event.data.userData)
      this.authWindow.close()

      if (
        this.state.isLoggedIn &&
        !this.state.hasCharacters
      ) {
        this.getUserData()
      }
    }
  }

  componentWillMount () {
    this.getUserData()
    window.addEventListener('message', this.receiveMessage, false)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.receiveMessage, false)
  }

  onChoiceChanged (name, prop, value) {
    const choice = this.state.data[name] || {}
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: {
          ...choice,
          [prop]: value
        }
      },
      hasChanges: true
    })
  }

  onHideFeedbackMessage () {
    window.clearTimeout(this.fadeOutFeedbackMessageTimer)
    window.clearTimeout(this.hideFeedbackMessageTimer)
    this.setState({
      ...this.state,
      showFeedbackMessage: false
    })
  }

  fadeOutFeedbackMessage () {
    window.clearTimeout(this.fadeOutFeedbackMessageTimer)
    this.setState({
      ...this.state,
      fadeOutFeedbackMessage: true
    })
    this.hideFeedbackMessageTimer = window.setTimeout(() => this.onHideFeedbackMessage(), 1000)
  }

  showFeedbackMessage (message) {
    this.setState({
      ...this.state,
      showFeedbackMessage: true,
      fadeOutFeedbackMessage: false,
      feedbackMessage: message
    })
    this.fadeOutFeedbackMessageTimer = window.setTimeout(() => this.fadeOutFeedbackMessage(), 1000)
  }

  render () {
    return (
      <div className={STYLES.bfaPlanner}>

        <Section type={'header'}>
          <Header userData={this.state.user} onLoginClick={this.login}>
            Distinctly Average Class Selection
            <SubHeader>
              For Kids Who Can't Raid Good And Want To Learn How To Do Other Good Stuff Too
            </SubHeader>
          </Header>
        </Section>

        <Divider />

        <MainSection
          {...this.state}
          onChoiceChanged={this.onChoiceChanged}
          onLoginClick={this.onLogin}
          onSaveClick={this.onSave}
          onFeedbackMessageClick={this.onHideFeedbackMessage} />

        <Divider type={'bottom'} />

        <Section type={'fill'}>
          <Footer />
        </Section>

      </div>
    )
  }
}

export default BfaPlanner
