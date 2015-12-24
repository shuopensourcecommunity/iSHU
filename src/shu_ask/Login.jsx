'use strict';
require('../../style/css/shu_ask/Login.css');
const HeadBar = require('./HeadBar.jsx');
const React =require('react');
const {Link, RouteHandler} = require('react-router');
const {TextField, RaisedButton} = require('material-ui');

const LoginForm = React.createClass({
	render: function() {
		return(
			<div className="lg-container">
				<TextField className="text-field"
					floatingLabelText="学  号" type='id' onChange={this.idHandleChange} />
				<br />
				<TextField className="text-field"
					floatingLabelText="密  码"
					type = "password" onChange={this.pwdHandleChange} />
				<br />
				<br />
				<RaisedButton label="登陆" secondary={true} onTouchTap={this._handleLogin} />
				<RaisedButton label="重置" secondary={true} onTouchTap={this._handleReset} />
		  </div>
		);
	}
});

const Login = React.createClass({
	render: function() {
    return (
      <div>
        <HeadBar url= 'categories' />
				<LoginForm />
			</div>
		);
	}
});

module.exports = Login;
