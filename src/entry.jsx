'use strict';
var App = require('./App.jsx');
var SchoolInfo = require('./school-info.jsx');
var SchoolQuery = require('./school-query.jsx');
var SchoolService = require('./school-service.jsx');
var SchoolAskBar = require('./school-askbar.jsx');
var SchoolActivity = require('./school-activity.jsx');
var NotFound = require('./NotFound.jsx');
var ActSignup = require('./act-signup.jsx');

var React = require('react')
var {render} = require('react-dom');
var {Router, Route, Link, History, Lifecycle } = require('react-router');

render((
  <Router>
    <Route path="/" component={App}/>
    <Route path="info" component={SchoolInfo} />
    <Route path="query" component={SchoolQuery}/>
    <Route path="service" component={SchoolService}/>
    <Route path="askbar" component={SchoolAskBar} />
    <Route path="activity" component={SchoolActivity}/>
    <Route path="signup" params=":id" component={ActSignup}/>
  </Router>
),document.getElementById('app-container'))
