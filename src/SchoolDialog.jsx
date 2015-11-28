'use strict'
require("../style/css/Activity.css");
require("../style/css/Signup.css");
var React = require("react");
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
      // snackbar hide duration, milliseconds
      mail: 'Hello!',
      phone: '123',
      reason: 'dsf',
      id: '13121312',
      pwd: 'J123123dandi',
      status: '请稍等，信息正在空中飞翔。。。',
      realname: 'a',
      cookie: this.props.cookie,
    };
  },
  _handleSignUpClick: function(){
    console.log('will pop up a modal dialog');
    this.setState({showDialogActions: true});
  },
  _handleLogin: function(){
    this.setState({showDialogActions: false});
    this.refs.success.show();
    var data={
      'id': this.state.id,
      'pwd': this.state.pwd,
    };
    console.log(data);
    $.ajax({
      url: 'userlogin',
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
        var t_status = data.status;
        this.setState({status: t_status});
        if (t_status == "登录成功") {
          var t_realname = data.realname;
          var t_username = data.username;
          this.setState({realname: t_realname});
          this.setState({cookie: t_username});
        };
        // console.log("cookie: "+ this.state.cookie);
      }.bind(this),
      error: function(xhr, status, err) {
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
    this.setState({showDialogActions: false});
    this.refs.success.show();
    console.log(this.props.ActionID);
    var data={
      'action_id': this.props.ActionID,
      'phone': this.state.phone,
      'mail': this.state.mail,
      'reason': this.state.reason,
      'cookie': this.state.cookie,
    };
    console.log("data: "+data);
    $.ajax({
      url: 'applyforcampusaction',
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
        console.log(data);
        this.setState({isJoined: true});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  _handleAction: function(event){
    this.refs.success.dismiss();
  },
  // handle TextField onChange
  phoneHandleChange: function(event) {
    this.setState({phone: event.target.value});
    console.log(this.state.phone);
  },
  mailHandleChange: function(event) {
    this.setState({mail: event.target.value});
  },
  textHandleChange: function(event) {
    this.setState({text: event.target.value});
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
        label={this.state.cookie==undefined? "登陆":"报名"}
        primary={true}
        onTouchTap={this.state.cookie==undefined? this._handleLogin:this._handleDialogSubmit} />
    ];
    let styles = {
      content : {
        width: '100%',
        position: 'relative',
        zIndex: 10,
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
          floatingLabelText="参加理由：" type="text" multiLine="true" onChange={this.textHandleChange}/>
        <br />
      </div>
    ];
    var text = this.state.cookie==undefined? login:signup;
    console.log(this.state.realname);
  	return (
  		<div>
        <RaisedButton label="我要报名" secondary={true} disabled={this.state.isJoined} onTouchTap={this._handleSignUpClick} />
        <Dialog
            ref="signup"
            title={this.state.cookie==undefined? "登陆":"我要报名"}
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
            ref="success"
            message={this.state.status}
            action="关闭"
            autoHideDuration={this.state.autoHideDuration}
            onActionTouchTap={this._handleAction}/>
      </div>
    );
  }
});
module.exports = SchoolDialog;

