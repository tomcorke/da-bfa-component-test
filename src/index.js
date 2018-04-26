import React from 'react';
import ReactDOM from 'react-dom';

import BfaPlanner from './components/bfa-planner'

import './base.scss';

ReactDOM.render(
  <BfaPlanner />,
  document.getElementById('app'),
);

module.hot.accept()
