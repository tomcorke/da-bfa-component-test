import React from 'react'

import Section from '../section'
import Divider from '../divider'
import Header from '../header'
import SubHeader from '../subheader'
import Footer from '../footer'
import MainSection from '../main-section'

import WindowMessageReceiver from '../window-message-receiver'

import STYLES from './bfa-planner.scss'

class BfaPlanner extends React.Component {
  componentDidMount (props) {
    this.props.init()
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
