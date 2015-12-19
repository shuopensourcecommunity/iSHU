'use strict';
require("../../style/css/shu_ask/Login.css");
var React = require('react');
var HeadBar = require('./HeadBar.js');
var {Link, RouteHandler} = require('react-router');

var LoginForm = React.createClass({
	render: function(){
		return(
			<div className="container lg-container">
		      <form className="form-login">
		        <label className="label-input-id" htmlFor="inputID"> 通行证:</label>
		        <input className="form-control" id="inputID" placeholder="通行证" required="" autofocus="" />
		        <label className="label-input-pw" htmlFor="inputPassword"> 密码:</label>
		        <input type="password" id="inputPassword" className="form-control" placeholder="密码" required="" />
		        <div className="checkbox">
		          <label>
		            <input type="checkbox" value="remember-me" /> 下次自动登录
		          </label>
		        </div>
		        <div className="btn-login-confirm">
		          <button className="btn btn-lg btn-block" type="button">取消</button>
		          <button className="btn btn-lg btn-primary btn-block" type="submit">登陆</button>
		        </div>
		      </form>
		    </div>
		);
	}
});

var Login = React.createClass({
	render: function(){
    	return (
      		<div>
        		<HeadBar url= 'categories' />
				<LoginForm />
			</div>
		);
	}
});

module.exports = Login;
