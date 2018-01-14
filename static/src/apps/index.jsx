import React from 'react'
import ReactDOM from 'react-dom'
// https://github.com/react-translate-team/react-router-CN
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import App from '../pages/index'
import Admin from '../pages/admin'
import 'antd/dist/antd.less';  // or 'antd/dist/antd.less'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={ App }/>
      <Route path="/admin" component={ Admin }/>
    </div>
  </Router>,
  document.getElementById("app"))