'use strict';
const React = require('react');
const {Link, RouteHandler} = require('react-router');

const App = React.createClass({
    render: function(){
      return (
        <div>
          <RouteHandler/>
		</div>
      );
    }
});

module.exports = App;
