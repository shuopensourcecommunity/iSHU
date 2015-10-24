'use strict'

var React = require('react');
var {render} = require('react-dom');
var Mui = require('material-ui');
var AppBar = Mui.AppBar;

const App = React.createClass({
  render() {
    return (
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more" />
    )
  }
})

module.exports = App;
