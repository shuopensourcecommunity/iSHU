'use strict'
const React = require('react');
var {render} = require('react-dom');
const RaisedButton = require('material-ui/lib/raised-button');

const App = React.createClass({
  render() {
    return (
      <RaisedButton label="Default"/>
    )
  }
})

module.exports = App;
