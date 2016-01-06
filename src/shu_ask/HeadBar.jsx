'use strict'
const React =require('react');
const cookie = require('react-cookie');
const Colors = require('../../public/js/colors');
const {Link, RouteHandler} = require('react-router');
const {ActionHome, ActionSearch, HardwareKeyboardArrowLeft, NavigationMoreVert} = require('../../public/js/svg-icons');
const {AppBar, Divider, DropDownMenu, IconButton, IconMenu, MenuItem, Popover, RaisedButton,
      Toolbar, ToolbarGroup, ToolbarTitle} = require('material-ui');
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const HeadBar = React.createClass({
  getDefaultProps: function() {
    return {
      title: '乐乎问吧'
    };
  },
  getInitialState: function() {
    return {
      activePopover: false
    };
  },

  show: function(e) {
    this.setState({
      activePopover: !this.state.activePopover,
      anchorEl:e.currentTarget,
    });
  },

  closePopover: function() {
    this.setState({
      activePopover:false,
    });
  },
  _handleLog: function() {
  	if (cookie.load('guid')) {
      $.ajax({
      url: 'logout',
      dataType: 'json',
      method: 'get',
      success: function(data) {
        if (data.State=='success') {
        	cookie.remove('guid');
          cookie.remove('username');
          alert('登出成功');
        	window.location.href="/askbar/";
      	}
        else {
          alert(data.status);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        alert('登出失败');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
     });
  	}
  	else {
  		window.location.href="/askbar/#/login";
  	}
  },
  render: function() {
    let iconElementLeft = (
      <Link to="/">
        <IconButton tooltip="Home" touch={true}>
          <ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
        </IconButton>
      </Link>
    );
    let btnText = cookie.load('guid')?'登出':'登陆';
    let text = cookie.load('guid')?'欢迎 '+cookie.load('username'):'您好，请登陆乐乎问吧';
    let iconElementRight = (
      <div>
        <IconButton onClick={this.show}>
          <NavigationMoreVert color={Colors.white} hoverColor={Colors.cyan900} />
        </IconButton>
        <Popover open={this.state.activePopover}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.closePopover} >
          <div style={{padding:10, width:200, textAlign:'center'}}>
            <p>{text}</p>
            <RaisedButton primary={true} label={btnText} onClick={this._handleLog}/>
          </div>
        </Popover>
      </div>

    );
    return (
      <div>
        <AppBar
          title={this.props.title}
          showMenuIconButton={true}
          iconElementLeft= {iconElementLeft}
          iconElementRight= {iconElementRight} />
      </div>
    );
  }
});

module.exports = HeadBar;
