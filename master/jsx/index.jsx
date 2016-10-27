import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './App'
import IDNumber from './components/IDNumber/index'
import Todo from './components/Todo/index'

import './../less/test.less'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>

      <IndexRoute component={IDNumber} />

      <Route path="/IDNumber" component={IDNumber} />
      <Route path="/todo" component={Todo} />

    </Route>
  </Router>
), document.getElementById('app'))
