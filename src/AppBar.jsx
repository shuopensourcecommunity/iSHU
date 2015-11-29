'use strict'
require("../style/css/main.css");
let React = require('react');
let cookie = require('react-cookie');
let {render} = require('react-dom');
var { Card, CardTitle, CardText, CardActions, CircularProgress,
      Dialog, FlatButton, RaisedButton, Snackbar, Tabs, Tab, TextField,
      AppBarComponent, MenuItem, MenuDivider } = require('material-ui');
let Colors = require('../public/mui/colors.js');
let ActionHome = require('../public/mui/svg-icons/action-home.jsx');
let MoreVertIcon = require('../public/mui/svg-icons/more-vert.jsx');
let { IconButton, IconMenu, Menu}= require('material-ui');
let {Link, RouteHandler} = require('react-router');

const AppBar = React.createClass({
  getDefaultProps: function(){
    return { title: '上海大学' };
  },
  getInitialState: function(){
    return { 
      AppBarTitle: '上海大学',
      isJoined: false,
      showDialogActions: false,
      autoHideDuration: 5000,
      id: '13121312',
      pwd: 'J123123dandi',
      status: '请稍等，信息正在空中飞翔。。。',
      realname: ''
    }
  },
  componentDidMount: function(){
    this.setState({AppBarTitle: this.props.title});
  },
  _handleLogin: function(){
    // this.setState({status: '请稍等，信息正在空中飞翔。。。'});
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
        this.setState({status: t_status,message: t_status});
        if (t_status == "登录成功") {
          var t_realname = data.realname;
          this.setState({realname: t_realname});
          cookie.save('username', data.username);
        };
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({status: '登陆失败'});
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
  _handleAction: function(event){
    this.refs.success.dismiss();
  },
  idHandleChange: function(event) {
    this.setState({id: event.target.value});
  },
  pwdHandleChange: function(event) {
    this.setState({pwd: event.target.value});
  },
  _handleLoginLogout: function(event, item){
    console.log(item);
    if(item == "登出") {
      cookie.remove('username');
      console.log("123");
    }
    if(item == "登录"){
      this.setState({showDialogActions: true});
      console.log("321");
    }  
  },
  render() {
    let logStatus = cookie.load('username') ? "登出" : "登录";
    let customActions = [
      <FlatButton
        label="取消"
        secondary={true}
        onTouchTap={this._handleDialogCancel} />,
      <FlatButton
        label="登陆"
        primary={true}
        onTouchTap={this._handleLogin} />
    ];
    let styles = {
      content : {
        width: '100%',
        position: 'relative',
        zIndex: 10,
      },
      main : {
        position: 'fixed'
        // position: 'absolute'
      }
    };
    return (
      <div>
        <AppBarComponent
          title={this.state.AppBarTitle}
          showMenuIconButton={true}
          iconElementLeft={
            <Link to="/">
              <IconButton tooltip="Home" touch={true}>
                <ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
              </IconButton>
            </Link>}
          iconElementRight={
            <IconMenu iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }>
              <MenuItem primaryText={logStatus}
                onItemTouchTap={this._handleLoginLogout(event, logStatus)} />
            </IconMenu>} />
        <Dialog
          ref="login"
          title="登陆"
          actions={customActions}
          open={this.state.showDialogActions}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          onRequestClose={this._handleRequestClose}
          contentStyle={styles.content}
          style={styles.main}>
          {customActions}
        </Dialog>
        <Snackbar
          ref="success"
          message={this.state.status}
          action="关闭"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._handleAction}/>
      </div>
    )
  }
});

module.exports = AppBar;
