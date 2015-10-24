'use strict'

var React = require('react');
var {render} = require('react-dom');
var Mui = require('material-ui');
var AppBarComponent = Mui.AppBar;
require("../public/css/main.css");

const AppBar = React.createClass({
  render() {
    return (
      <AppBarComponent className="app-bar" title="上海大学" />
    )
  }
})

module.exports = AppBar;
