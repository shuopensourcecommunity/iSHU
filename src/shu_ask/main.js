'use strict';
var App = require('./App.js');
var Home = require('./Home.js');
var Login = require('./Login.js');
var NotFound = require('./NotFound.js');
var About = require('./About.js');
var QuestionAnswer = require('./QuestionAnswer.js')
var AskAnsInfo = require('./AskAnsInfo.js');

//------------library require---------------------

var React = require('react')
var {render} = require('react-dom');
var Router = require('react-router');
var {Router, Route, Link, History, Lifecycle, DefaultRoute, Routes} = require('react-router');

render((
  <Router>
    <Route path="askbar" component={App} />
    <Route path="home" component={Home} />
    <Route path="home/:key" component={Home}/>
    <Route path="login" component={Login} />
    <Route path="about" component={About} />
    <Route path="question" component={QuestionAnswer.Question} />
    <Route path="answer/:id" component={QuestionAnswer.Answer} />
    <Route path="askAnsInfo/:id" params=":id" component={AskAnsInfo} />
    <Route path="*" component={NotFound} />
  </Router>
),document.getElementById('app-container'))