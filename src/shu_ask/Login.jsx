'use strict';
require('../../style/css/shu_ask/Login.css');
const HeadBar = require('./HeadBar.jsx');
const React =require('react');
const cookie = require('react-cookie');
const {Link, RouteHandler} = require('react-router');
const {TextField, FlatButton} = require('material-ui');

const LoginForm = React.createClass({
  getInitialState: function() {
    return {
      id: '',
      pwd: '',
      guid:'',
      username: ''
    }
  },

  handleLogin: function() {
    console.log(this.state.id+this.state.pwd);
    let data = {
      'username': this.state.id,
      'password': this.state.pwd
    };
    $.ajax({
      url: 'login',
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
        console.log(data);
        this.setState({
          guid: data.Data.Guid,
          username: data.Data.UserName
        });
        cookie.save('username', data.Data.UserName);
        cookie.save('guid', data.Data.Guid);
        alert('登录成功');
        window.location.href="/askbar/"
        // var t_status = data.status;
        // this.setState({status: t_status,message: t_status});
        // if (t_status == "登录成功") {
        //   var t_realname = data.realname;
        //   this.setState({realname: t_realname});
        //   cookie.save('username', data.username);
        //   this.setState({logStatus: "登出"});
        // };
      }.bind(this),
      error: function(xhr, status, err) {
        alert('登陆失败');
        // this.setState({status: '登陆失败'});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleIdValue: function(e) {
    this.setState({id: e.target.value});
  },

  handlePwdValue: function(e) {
    this.setState({pwd: e.target.value});
  },

  handleReset: function() {
    this.refs.id.clearValue();
    this.refs.pwd.clearValue();
  },

  render: function() {
    return(
      <div className="lg-container">
        <TextField ref='id' className="text-field"
          floatingLabelText="学  号" type='id' onChange={this.handleIdValue} />
        <br />
        <TextField ref='pwd' className="text-field"
          floatingLabelText="密  码"
          type = "password" onChange={this.handlePwdValue} />
        <br />
        <br />
        <FlatButton
        	label="登陆"
        	primary={true}
       		keyboardFocused={true}
       		onTouchTap={this.handleLogin} />
        <FlatButton
        	label="重置"
        	secondary={true}
       		onTouchTap={this.handleReset} />
      </div>
    );
  }
});

const Login = React.createClass({
  render: function() {
    return (
      <div>
        <HeadBar title='登录' />
        <LoginForm />
      </div>
    );
  }
});

module.exports = Login;
