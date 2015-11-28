'use strict'
require("../style/css/main.css");
let React = require('react');
var cookie = require('react-cookie');
let {render} = require('react-dom');
let mui = require('material-ui');
let AppBarComponent = mui.AppBar;
let IconButton = mui.IconButton;
let Colors = mui.Styles.Colors;
//let Colors = require('../public/mui/colors.js');
let ActionHome = require('../public/mui/svg-icons/action-home.jsx');
let {Link, RouteHandler} = require('react-router');

const AppBar = React.createClass({
  getInitialState: function(){
    return{
      AppBarTitle: '上海大学'
    };
  },
  componentDidMount: function(){
    this.setState({AppBarTitle: this.props.title});
  },
  render() {
    return (
      <AppBarComponent
        showMenuIconButton={true}
        iconElementLeft={<Link to="/">
          <IconButton tooltip="Home" touch={true}>
            <ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
          </IconButton>
        </Link>}
        title={this.state.AppBarTitle} />
    )
  }
})

module.exports = AppBar;
