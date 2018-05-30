import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from './store/configure'

import BfaPlanner from './components/bfa-planner'

import './reset.scss'
import './base.scss'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BfaPlanner />
  </Provider>,
  document.getElementById('app')
)
