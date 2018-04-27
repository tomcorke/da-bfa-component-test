import React from 'react'
import ReactDOM from 'react-dom'

import BfaPlanner from './components/bfa-planner'

import './reset.scss'
import './base.scss'

const config = require(`./config/${process.env.NODE_ENV}`).default

ReactDOM.render(
  <BfaPlanner config={config} />,
  document.getElementById('app')
)

module.hot.accept()
