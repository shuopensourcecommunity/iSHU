'use strict';
var Home = require('./Home.js');
var HeadBar = require('./HeadBar.js');
var React = require('react');
var {Link, RouteHandler} = require('react-router');

var App = React.createClass({
    render: function(){
      return (
        <div>
          <RouteHandler/>
		</div>
      );
    }
});

module.exports = App;
