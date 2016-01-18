'use strict'
require("../style/css/ishu/Activity.css");
require("../style/css/ishu/Signup.css");
var React = require("react");
var cookie = require('react-cookie');
var { Card, CardTitle, CardText, CardActions, CircularProgress,
      Dialog, FlatButton, RaisedButton, Snackbar, Tabs, Tab, TextField } = require('material-ui');
var AppBar = require('./AppBar.jsx');
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var SchoolDialog= React.createClass({
  getInitialState: function() {
    return {
      isJoined: false,
      showDialogActions: false,
      autoHideDuration: 5000,
      mail: '',
      phone: '',
      reason: '',
      id: '',
      pwd: '',
      status: '请稍等，信息正在空中飞翔。。。',
      realname: '',
      username: cookie.load('ishu_username'),
      snackbarOpen: false
    };
  },
  handleBack: function(){
    window.location.href="#/activity";
  },
  handleSignUpClick: function(){
    this.setState({showDialogActions: true});
  },
  _handleLogin: function(){
    this.setState({status: '请稍等，信息正在空中飞翔。。。'});
    this.setState({
      showDialogActions: false,
      snackbarOpen: true
    });
    var data={
      'id': this.state.id,
      'pwd': this.state.pwd
    };
    $.ajax({
      url: 'user_login',
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
        var t_status = data.status;
        this.setState({status: t_status,message: t_status});
        if (t_status == "登录成功") {
          var t_realname = data.realname;
          var t_username = data.username;
          this.setState({realname: t_realname});
          this.setState({username: t_username});
          cookie.save('ishu_username', t_username);

        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({status: '登录失败'});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  _handleRequestClose: function(){
    this.setState({showDialogActions: false});
  },
  _handleDialogCancel: function(){
    this.setState({showDialogActions: false});
  },
  _handleDialogSubmit: function(){
    this.setState({status: '请稍等，信息正在空中飞翔。。。'});
    this.setState({
      showDialogActions: false,
      snackbarOpen: true
    });
    var data={
      'action_id': this.props.ActionID,
      'phone': this.state.phone,
      'mail': this.state.mail,
      'reason': this.state.reason,
      'username': this.state.username
    };
    $.ajax({
      url: 'apply_for_campus_action',
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
        var t_status=data.status;
        this.setState({status: t_status});
        if (t_status == '报名成功') {
          this.setState({isJoined: true});
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({status: '报名失败'});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSnackbar: function(event){
    if (this.state.status == '登录成功') {this.setState({showDialogActions: true});}
    this.setState({snackbarOpen: false});
  },
  // handle TextField onChange
  phoneHandleChange: function(event) {
    this.setState({phone: event.target.value});
  },
  mailHandleChange: function(event) {
    this.setState({mail: event.target.value});
  },
  reasonHandleChange: function(event) {
    this.setState({reason: event.target.value});
  },
  idHandleChange: function(event) {
    this.setState({id: event.target.value});
  },
  pwdHandleChange: function(event) {
    this.setState({pwd: event.target.value});
  },
  render: function() {
  	let customActions = [
      <FlatButton
        label="取消"
        secondary={true}
        onTouchTap={this._handleDialogCancel} />,
      <FlatButton
        label={this.state.username==undefined? "登录":"报名"}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.state.username==undefined? this._handleLogin:this._handleDialogSubmit} />
    ];
    let styles = {
      content : {
        width: '100%',
        position: 'relative'
      },
      main : {
        position: 'fixed'
      }
    };
    let login = [
      <div className="index">
        <TextField className="text-field"
          floatingLabelText="学  号" type='id' onChange={this.idHandleChange}/>
        <br></br>
        <TextField className="text-field"
          floatingLabelText="密  码"
          type = "password" onChange={this.pwdHandleChange}/>
      </div>
    ];
    let signup = [
      <div className="index">
        <TextField className="text-field"
          floatingLabelText="手  机：" type="phone" onChange={this.phoneHandleChange}/>
        <br />
        <TextField className="text-field"
          floatingLabelText="邮  箱：" type="mail" onChange={this.mailHandleChange}/>
        <br />
        <TextField className="text-field"
          floatingLabelText="参加理由：" type="text" multiLine={true} onChange={this.reasonHandleChange}/>
        <br />
      </div>
    ];
    var text = cookie.load('ishu_username')? signup:login;
  	return (
  		<div>
        <div className="index">
          <FlatButton
            label="返回"
            secondary={true}
            onTouchTap={this.handleBack} />
          <FlatButton
            label="我要报名"
            primary={true}
            keyboardFocused={true}
            disabled={this.state.isJoined}
            onTouchTap={this.handleSignUpClick} />
        </div>

        <Dialog
            ref="signup"
            title={this.state.username==undefined? "登录":"我要报名"}
            actions={customActions}
            open={this.state.showDialogActions}
            autoDetectWindowHeight={true}
            autoScrollBodyContent={true}
            onRequestClose={this._handleRequestClose}
            contentStyle={styles.content}
            style={styles.main}>
            {text}
          </Dialog>
          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.status}
            action="关闭"
            autoHideDuration={this.state.autoHideDuration}
            onActionTouchTap={this.handleSnackbar}
            onRequestClose={this.handleSnackbar}/>
      </div>
    );
  }
});
module.exports = SchoolDialog;
