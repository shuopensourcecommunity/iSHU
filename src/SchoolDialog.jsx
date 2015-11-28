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
      text: 'dsf'
    };
  },

  _handleSignUpClick: function(){
    console.log('will pop up a modal dialog');
    this.setState({showDialogActions: true});
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
    var signUpData={
      'id': this.props.MsgID,
      'phone': this.state.phone,
      'mail': this.state.mail,
      'text': this.state.text,
      'cookie': this.props.cookie
    };
    console.log(signUpData);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
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
  render: function() {
  	let customActions = [
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={this._handleDialogCancel} />,
        <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this._handleDialogSubmit} />
    ];
    let styles = {
        content : {
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }
    };
  	return (
  		<div>
          <RaisedButton label="我要报名" secondary={true} disabled={this.state.isJoined} onTouchTap={this._handleSignUpClick} />
        <Dialog
            ref="signup"
            title="我要报名"
            actions={customActions}
            open={this.state.showDialogActions}
            autoDetectWindowHeight={true}
            autoScrollBodyContent={true}
            onRequestClose={this._handleRequestClose}
            contentStyle={styles.content}
            style={styles.main}>
            <div className="index">
              <TextField className="text-field"
                floatingLabelText="手机：" type="phone" onChange={this.phoneHandleChange}/>
              <br />
              <TextField className="text-field"
                floatingLabelText="邮箱：" type="mail" onChange={this.mailHandleChange}/>
              <br />
              <TextField className="text-field"
                floatingLabelText="参加理由：" type="text" multiLine="true" onChange={this.textHandleChange}/>
              <br />
            </div>
          </Dialog>
          <Snackbar
            ref="success"
            message="报名成功"
            action="关闭"
            autoHideDuration={this.state.autoHideDuration}
            onActionTouchTap={this._handleAction}/>
        </div>
    );
  }
});

module.exports = SchoolDialog;

