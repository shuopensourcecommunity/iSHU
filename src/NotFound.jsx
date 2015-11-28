'use strict';
var React = require('react');
var cookie = require('react-cookie');
var NotFound = React.createClass({
    render: function(){
        return(
            <h1>404 not found</h1>
        );
    }

});


module.exports = NotFound;
