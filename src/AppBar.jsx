'use strict'
require("../style/css/main.css");
let React = require('react');
var cookie = require('react-cookie');
let {render} = require('react-dom');
let mui = require('material-ui');
let AppBarComponent = mui.AppBar;
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');
let Colors = require('../public/mui/colors.js');
let ActionHome = require('../public/mui/svg-icons/action-home.jsx');
let MoreVertIcon = require('../public/mui/svg-icons/more-vert.jsx');
let { IconButton, IconMenu, Menu}= require('material-ui');
let {Link, RouteHandler} = require('react-router');
let cookie = require('react-cookie');

const AppBar = React.createClass({
  getDefaultProps: function(){
    return { title: '上海大学' };
  },
  getInitialState: function(){
    return { AppBarTitle: '上海大学' };
  },
  componentDidMount: function(){
    this.setState({AppBarTitle: this.props.title});
  },
  _handleLoginLogout: function(event, item){
    console.log(item);
    if(item == "登出") {
      console.log("123");
    }
    if(item == "登录"){
      console.log("321");
    }  
  },
  render() {
    let logStatus = cookie.load() ? "登出" : "登录";
    return (
      <AppBarComponent
        title={this.state.AppBarTitle}
        showMenuIconButton={true}
        iconElementLeft={<Link to="/">
          <IconButton tooltip="Home" touch={true}>
            <ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
          </IconButton>
        </Link>}
        iconElementRight={
          <IconMenu iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }>
              <MenuItem
                primaryText={logStatus}
                onChange={this._handleLoginLogout(event, logStatus)}
                 />
          </IconMenu>
        }
        />
    )
  }
})

module.exports = AppBar;
