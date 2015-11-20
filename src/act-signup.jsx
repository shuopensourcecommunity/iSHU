'use strict'
var React = require("react");
const AppBar = require('./AppBar.jsx');
require("../style/css/Signup.css");
let {TextField, RaisedButton} = require('material-ui');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);
var {Link, RouteHandler} = require('react-router');

var ActSignup= React.createClass({
  // onTouchTab
  getInitialState: function() {
    return {mail: 'Hello!',phone: '123',text: 'dsf'};
  },
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
  signUp: function() {
    var data="{id:"+this.props.MsgID+",phone:"+this.state.phone+",mail:"+this.state.mail+",text:"+this.state.text+",cookie:"+this.props.cookie+"}";
    console.log(data);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      methods: 'post',
      data: data,
      success: function(data) {
        this.setState({re: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    this.setState({re: 'success!'});
    console.log(this.state.re);
  },
  render: function(){
    var title="标题："+"ahhh";
    var phone=this.state.phone;
    var mail=this.state.mail;
    var text=this.state.text;
    var re=this.state.re;
    return (
      <div>
        <AppBar title="我要报名"/>
        <div className="index">
          <h1>{title}</h1>
          <TextField
            floatingLabelText="手机：" type="phone" onChange={this.phoneHandleChange}/>
          <br />
          <TextField
            floatingLabelText="邮箱：" type="mail" onChange={this.mailHandleChange}/>
          <br />
          <TextField className="text-field"
            floatingLabelText="参加理由：" type="text" multiLine="true" onChange={this.textHandleChange}/>
          <br />
          <RaisedButton label="我要报名" secondary={true} onTouchTap={this.signUp}/>
          <Link to="/Activity"><RaisedButton label="返回" /></Link>
        </div>
        <h2>{re}</h2>
      </div>
    );
  }
});

module.exports = ActSignup;
