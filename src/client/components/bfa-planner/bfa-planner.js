import React from 'react'

import Section from '../section'
import Divider from '../divider'
import Header from '../header'
import SubHeader from '../subheader'
import Footer from '../footer'
import MainSection from '../main-section'

import WindowMessageReceiver from '../window-message-receiver'

import STYLES from './bfa-planner.scss'

/*

  tryChangeView (option) {
    if (option === 'main') {
      return this.setState({
        ...this.state,
        view: 'main'
      })
    }

    if (option === 'overview') {
      const { getOverviewViewDataEndpoint } = this.props.config
      console.log('Fetching overview data')
      return window.fetch(getOverviewViewDataEndpoint, { credentials: 'include' })
        .then(response => {
          if (response.status !== 200) {
            throw Error('Could not get overview view data')
          }
          return response.json()
        })
        .then(data => {
          console.log('Received overview data', data)
          this.setState({
            ...this.state,
            viewData: {
              overview: data
            },
            view: 'overview'
          })
        })
        .catch(err => console.error(`Error fetching overview view data: ${err.message}`))
    }
  }
}
*/

class BfaPlanner extends React.Component {
  componentDidMount (props) {
    this.props && !this.props.isGettingUserData && this.props.getUserData()
  }

  render () {
    return (
      <div className={STYLES.bfaPlanner}>

        <Section type={'header'}>
          <Header>
            Distinctly Average Class Selection
            <SubHeader>
              For Kids Who Can't Raid Good And Want To Learn How To Do Other Good Stuff Too
            </SubHeader>
          </Header>
        </Section>

        <Divider />

        <MainSection />

        <Divider type={'bottom'} />

        <Section type={'fill'}>
          <Footer />
        </Section>

        <WindowMessageReceiver />

      </div>
    )
  }
}

export default BfaPlanner
