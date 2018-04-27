import React from 'react'

import Section from '../section'
import Divider from '../divider'
import ClassSelectWrapper from '../class-select-wrapper'
import ClassSelect from '../class-select'
import CommentsBox from '../comments-box'
import Button from '../button'
import Header from '../header'
import SubHeader from '../subheader'
import LoginPrompt from '../login-prompt'
import Footer from '../footer'

import STYLES from './bfa-planner.scss'

const getBlurb = (name) => {
  return ({
    first: 'Main choice:',
    second: 'Alt choice:',
    third: 'Backup choice:'
  })[name]
}

const popupWindow = (url, win, w, h) => {
  var y = win.top.outerHeight / 2 + win.top.screenY - (h / 2)
  var x = win.top.outerWidth / 2 + win.top.screenX - (w / 2)
  return win.open(url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + y + ', left=' + x)
}

class BfaPlanner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      choices: {}
    }
    this.login = this.login.bind(this)
    this.receiveMessage = this.receiveMessage.bind(this)
  }

  getUserData () {
    const { userDataEndpoint, mockUserData, mockChoices = {} } = this.props.config

    if (mockUserData) {
      this.setState({
        ...this.state,
        user: mockUserData,
        data: mockChoices
      })
    }

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
        const { user, data: savedData } = data
        this.setState({
          ...this.state,
          user: user,
          data: savedData || {}
        })
      })
      .catch(err => console.error(err))
  }

  login () {
    const { bnetAuthEndpoint } = this.props.config
    const authUrl = bnetAuthEndpoint
    this.authWindow = popupWindow(authUrl, window, 450, 600)
  }

  save () {
    const xhr = new window.XMLHttpRequest()
    const { saveDataEndpoint } = this.props.config
    xhr.open('POST', saveDataEndpoint, true)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(JSON.stringify(this.state.data))
  }

  receiveMessage (event) {
    if (event.source === this.authWindow) {
      console.log('Message from auth window', event.data.userData)
      const { user, data } = event.data.userData
      this.setState({
        ...this.state,
        user: user,
        data: data || {}
      })
      this.authWindow.close()
    } else {
      console.warn(`Unrecognised message source: "${event.source}"`)
    }
    console.log(event, this.state)
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
      }
    })
  }

  createClassSelect (name) {
    const onChange = (value) => this.onChoiceChanged(name, 'selected', value)
    const choice = this.state.data[name] || {}
    return <ClassSelect onChange={onChange} value={choice.selected} />
  }

  createCommentsBox (name) {
    const onChange = (value) => this.onChoiceChanged(name, 'comments', value)
    const choice = this.state.data[name] || {}
    return <CommentsBox onChange={onChange} value={choice.comments} />
  }

  createClassElements (name) {
    return (
      <ClassSelectWrapper key={name} description={getBlurb(name)}>
        { this.createClassSelect(name) }
        { this.createCommentsBox(name) }
      </ClassSelectWrapper>
    )
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

        <Section type={'main'}>
          <p>
            Welcome to class selection! We're releasing this a little early so you can get to grips with this page, and we can get an idea who is looking at what for the expansion! - Any problems and we'll contact you directly! Have fun!
          </p>
          {this.state.user
            ? [
              this.createClassElements('first'),
              this.createClassElements('second'),
              this.createClassElements('third'),
              <Button key='save' type='save' text='Save your selections' onClick={() => this.save()} />
            ]
            : <LoginPrompt />
          }
        </Section>

        <Divider type={'bottom'} />

        <Section type={'fill'}>
          <Footer />
        </Section>

      </div>
    )
  }
}

export default BfaPlanner
