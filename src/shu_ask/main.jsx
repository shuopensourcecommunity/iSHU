'use strict';
const App = require('./App.jsx');
const Home = require('./Home.jsx');
const Login = require('./Login.jsx');
const NotFound = require('./NotFound.jsx');
const About = require('./About.jsx');
const QuestionAnswer = require('./QuestionAnswer.jsx')
const AskAnsInfo = require('./AskAnsInfo.jsx');

const React = require('react');
const {render} = require('react-dom');
const {Router, Route, Link, History, Lifecycle} = require('react-router');

render((
  <Router>
    <Route path="/" component={Home} />
    <Route path="/:id" component={Home} />
    <Route path="login" component={Login} />
    <Route path="about" component={About} />
    <Route path="question" component={QuestionAnswer.Question} />
    <Route path="answer/:id" component={QuestionAnswer.Answer} />
    <Route path="askAnsInfo/:id" component={AskAnsInfo} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('app-container'))
