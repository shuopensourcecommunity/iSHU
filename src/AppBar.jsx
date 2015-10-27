'use strict'
require("../style/css/main.css");
let React = require('react');
let {render} = require('react-dom');
let mui = require('material-ui');
let AppBarComponent = mui.AppBar;
let IconButton = mui.IconButton;
let Colors = mui.Styles.Colors;
//let Colors = require('../public/js/colors.js');
let ActionHome = require('../public/js/svg-icons/action-home.jsx');
let {Link, RouteHandler} = require('react-router');

const AppBar = React.createClass({
  render() {
    let appBarTitle = '上海大学';
    return (
      <AppBarComponent
        showMenuIconButton={true}
        iconElementLeft={<Link to="/">
          <IconButton tooltip="Home" touch={true}>
            <ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
          </IconButton>
        </Link>}
        title={appBarTitle} />
    )
  }
})

module.exports = AppBar;
