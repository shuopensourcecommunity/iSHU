/** @jsx React.DON */
'use strict';
var App = require('./App.jsx');
var SchoolInfo = require('./school-info.jsx');
var SchoolQuery = require('./school-query.jsx');
var SchoolService = require('./school-service.jsx');
var SchoolAskBar = require('./school-askbar.jsx');
var SchoolActivity = require('./school-activity.jsx');
var NotFound = require('./NotFound.jsx');

var Router = require('react-router');
var React = require('react')
var {DefaultRoute, Route, Routes, NotFoundRoute} = Router;

render((
  <Router>
    <Route path="/" handler={App}/>
    <Route path="/info" handler={SchoolInfo} />
    <Route path="/query" handler={SchoolQuery}/>
    <Route path="service" handler={SchoolService}/>
    <Route path="askbar" handler={SchoolHandler} />
    <Route path="activity" handler={SchoolActivity}/>
    <NotFoundRoute handler={NotFound} />
  </Router>

),document.body)

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(
    <Root/>, document.body
  )
});
