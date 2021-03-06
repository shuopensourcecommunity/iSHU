'use strict'
require("../style/css/ishu/main.css");
const React = require('react');
const cookie = require('react-cookie');
const {render} = require('react-dom');
const mui = require('material-ui');
const AppBarComponent = mui.AppBar;
const MenuItem = require('material-ui/lib/menus/menu-item');
const Divider = require('material-ui/lib/divider');
const { Card, CardTitle, CardText, CardActions, CircularProgress,
  Dialog, FlatButton, RaisedButton, Snackbar, Tabs, Tab, TextField } = require('material-ui');
const Colors = require('../public/js/colors.js');
const {ActionHome, NavigationMoreVert} = require('../public/js/svg-icons');
const {IconButton, IconMenu, Menu}= require('material-ui');
const {Link, RouteHandler} = require('react-router');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');

const AppBar = React.createClass({
  getDefaultProps: function(){
    return {
      title: '上海大学',
      zDepth: 1
     };
  },
  getInitialState: function(){
    return {
      //AppBarTitle: '上海大学',
      showDialogActions: false,
      autoHideDuration: 5000,
      snackbarOpen: false,
      id: '',
      pwd: '',
      status: '请稍等，信息正在空中飞翔。。。',
      realname: '',
      logStatus: cookie.load('ishu_username')?"登出":"登录",
      homeData: [
        { title: "校园资讯", img: "/static/style/imgs/school-info.png", linkto: "#info" },
        { title: "校园活动", img: "/static/style/imgs/school-activity.png", linkto: "#activity" },
        { title: "校园查询", img: "/static/style/imgs/school-query.png", linkto: "#query" },
        { title: "校园服务", img: "/static/style/imgs/school-service.png", linkto: "#service" },
        { title: "乐乎问吧", img: "/static/style/imgs/lehu-ask.png", linkto: "#askbar"},
        { title: "学生事务", img: "/static/style/imgs/banshi-query.png", linkto: "#student"}
      ]
    }
  },
  componentDidMount: function(){
    //this.setState({AppBarTitle: this.props.title});
  },
  handleLogin: function(){
    this.setState({status: '请稍等，信息正在空中飞翔。。。'});
    this.setState({showDialogActions: false});
    this.refs.success.show();
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
          this.setState({realname: t_realname});
          cookie.save('ishu_username', data.username);
          this.setState({logStatus: "登出"});
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({status: '登录失败'});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleRequestClose: function(){
    this.setState({showDialogActions: false});
  },
  handleDialogCancel: function(){
    this.setState({showDialogActions: false});
  },
  handleSnackbarRequestClose: function(){
    this.setState({snackbarOpen: true});
  },
  idHandleChange: function(event) {
    this.setState({id: event.target.value});
  },
  pwdHandleChange: function(event) {
    this.setState({pwd: event.target.value});
  },
  handleLoginLogout: function(){
    if(cookie.load('ishu_username')) {
      cookie.remove('ishu_username');
      this.setState({logStatus: "登录"});
    }
    else {
      this.setState({logStatus: "登出"});
      this.setState({showDialogActions: true});
    }
  },
  render: function() {
    const customActions = [
      <FlatButton
        label="取消"
        secondary={true}
        onTouchTap={this.handleDialogCancel} />,
      <FlatButton
        label="登录"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleLogin} />
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
    let title = (this.props.title=="上海大学")
      ? <img className="ishu-logo-img" src="/static/style/imgs/shu-logo-white-text.png" />
      : this.props.title;
    document.title = title;
    return (
      <div ref="myAppBarMenu">
        <AppBarComponent
          zDepth={this.props.zDepth}
          title={title}
          showMenuIconButton={true}
          iconElementLeft={
            <Link to="/">
              <IconButton tooltip="Home" touch={true}>
                <ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
              </IconButton>
            </Link>}
          iconElementRight={
            <IconMenu
              closeOnItemTouchTap={true}
              iconButtonElement={
                <IconButton>
                  <NavigationMoreVert />
                </IconButton> }>
              {
                this.state.homeData.map(home =>
                  <MenuItem primaryText={home.title} href={home.linkto}/>
                )
              }
              <Divider />
              <MenuItem
                primaryText={cookie.load('ishu_username')?"登出":"登录"}
                onTouchTap={this.handleLoginLogout} />
            </IconMenu>} />
        <Dialog
          title="登录"
          actions={customActions}
          open={this.state.showDialogActions}
          autoScrollBodyContent={true}
          onRequestClose={this.handleRequestClose}
          contentStyle={styles.content}
          style={styles.main}>
          <div className="index">
            <TextField className="text-field"
              floatingLabelText="学  号"
              type='id'
              onChange={this.idHandleChange}/>
            <br></br>
            <TextField className="text-field"
              floatingLabelText="密  码"
              type = "password"
              onChange={this.pwdHandleChange} />
          </div>
        </Dialog>
        <Snackbar
          ref="success"
          message={this.state.status}
          action="关闭"
          open={this.state.snackbarOpen}
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleSnackbarRequestClose}
          onRequestClose={this.handleSnackbarRequestClose}/>
      </div>
    )
  }
});

module.exports = AppBar;
