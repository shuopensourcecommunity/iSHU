'use strict';
var App = require('./App.jsx');
var cookie = require('react-cookie');
var SchoolInfo = require('./school-info.jsx');
var SchoolQuery = require('./school-query.jsx');
var SchoolService = require('./school-service.jsx');
var SchoolAskBar = require('./school-askbar.jsx');
var SchoolActivity = require('./school-activity.jsx');
var ServiceVolunteer = require('./service-volunteer.jsx');
var StudentService = require('./student-service.jsx');
var NotFound = require('./NotFound.jsx');

var React = require('react')
var {render} = require('react-dom');
var {Router, Route, Link, History, Lifecycle, DefaultRoute, Routes} = require('react-router');
 
render((
  <Router>
    <Route path="/" component={App} />
    <Route path="info" component={SchoolInfo} />
    <Route path="query" component={SchoolQuery}/>
    <Route path="service" component={SchoolService}/>
    <Route path="activity" component={SchoolActivity}/>
    <Route path="volunter" component={ServiceVolunteer}/>
    <Route path="student" component={StudentService}/>
    <Route path="*" component={NotFound} />
  </Router>
),document.getElementById('app-container'))
