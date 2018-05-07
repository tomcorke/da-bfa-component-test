import React from 'react'

class WindowMessageReceiver extends React.Component {
  constructor (props) {
    super(props)
    this.receiveMessage = this.receiveMessage.bind(this)
  }

  receiveMessage (event) {
    if (event.source === this.props.authWindow) {
      console.log('Received message from auth window', event.data)

      this.props.handleUserData(event.data.userData)
      this.props.closeAuthWindow()
    }
  }

  componentWillMount () {
    window.addEventListener('message', this.receiveMessage, false)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.receiveMessage, false)
  }

  render () {
    return null
  }
}

export default WindowMessageReceiver
