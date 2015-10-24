'use strict'
const React = require('react');
var {render} = require('react-dom');
const AppBar = require('./AppBar.jsx');

const App = React.createClass({
  render() {
    return (
      <div>
        <AppBar />
      </div>
    )
  }
})

module.exports = App;
