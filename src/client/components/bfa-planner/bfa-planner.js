import React, { Fragment } from 'react'

import Section from '../section'
import Divider from '../divider'
import Panel from '../panel'
import ClassSelectWrapper from '../class-select-wrapper'
import ClassSelect from '../class-select'
import CommentsBox from '../comments-box'
import Button from '../button'
import Header from '../header'
import SubHeader from '../subheader'

import STYLES from './bfa-planner.scss'

const getBlurb = (name) => {
  return ({
    first: 'Test first choice',
    second: 'Test second choice',
    third: 'Test third choice'
  })[name]
}

const popupWindow = (url, win, w, h) => {
  var y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2)
  var x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2)
  return win.open(url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+y+', left='+x);
}

class BfaPlanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choices: {}
    }
    this.login = this.login.bind(this)
    this.receiveMessage = this.receiveMessage.bind(this)
  }

  getUserData() {
    const { userDataEndpoint, mockUserData } = this.props.config;

    if (mockUserData) {
      this.setState({
        ...this.state,
        user: mockUserData
      })
    }

    fetch(userDataEndpoint,
      {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          ...this.state,
          user: data
        })
      })
  }

  login() {
    const { bnetAuthEndpoint } = this.props.config
    const authUrl = bnetAuthEndpoint
    this.authWindow = popupWindow(authUrl, window, 450, 600)
  }

  receiveMessage(event) {
    if (event.source === this.authWindow) {
      console.log('Message from auth window')
      this.setState({
        ...this.state,
        user: event.data.userData
      })
      this.authWindow.close()
    } else {
      console.warn(`Unrecognised message source: "${event.source}"`)
    }
    console.log(event, this.state)
  }

  componentWillMount() {
    this.getUserData();
    window.addEventListener('message', this.receiveMessage, false)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage, false)
  }

  onChoiceChanged(name, prop, value) {
    const choice = this.state.choices[name] || {}
    this.setState({
      ...this.state,
      choices: {
        ...this.state.choices,
        [name]: {
          ...choice,
          [prop]: value
        }
      }
    })
  }

  createClassSelect(name) {
    const onChange = (value) => this.onChoiceChanged(name, 'selected', value)
    const choice = this.state.choices[name] || {}
    return <ClassSelect onChange={onChange} value={choice.selected} />
  }

  createCommentsBox(name) {
    const onChange = (value) => this.onChoiceChanged(name, 'comments', value)
    const choice = this.state.choices[name] || {}
    return <CommentsBox onChange={onChange} value={choice.comments} />
  }

  createClassElements(name) {
    return (
      <ClassSelectWrapper description={getBlurb(name)}>
        { this.createClassSelect(name) }
        { this.createCommentsBox(name) }
      </ClassSelectWrapper>
    )
  }

  render() {
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
          { this.createClassElements('first') }
          { this.createClassElements('second') }
          { this.createClassElements('third') }
          <Button text="Save stuff" />
        </Section>

        <Divider type={'bottom'} />

        <Section type={'fill'}>
        </Section>

      </div>
    )
  }
}

export default BfaPlanner
