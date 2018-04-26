import React, { Fragment } from 'react'

import Section from '../section'
import Divider from '../divider'
import Panel from '../panel'
import ClassSelectWrapper from '../class-select-wrapper'
import ClassSelect from '../class-select'
import CommentsBox from '../comments-box'

import STYLES from './bfa-planner.scss'

const getBlurb = (name) => {
  return ({
    first: 'Test first choice',
    second: 'Test second choice',
    third: 'Test third choice'
  })[name]
}

class BfaPlanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choices: {}
    }
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

        <Section>
          Pick your classes, fuckers
        </Section>

        <Divider />

        <Section type={'main'}>
          { this.createClassElements('first') }
          { this.createClassElements('second') }
          { this.createClassElements('third') }
        </Section>

        <Divider type={'bottom'} />

        <Section type={'fill'}>
        </Section>

      </div>
    )
  }
}

export default BfaPlanner
