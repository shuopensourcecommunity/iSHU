'use strict'
const React =require('react');
const cookie = require('react-cookie');
const Colors = require('../../public/js/colors');
const {Link, RouteHandler} = require('react-router');
const {ActionHome, ActionSearch, HardwareKeyboardArrowLeft, NavigationMoreVert} = require('../../public/js/svg-icons');
const {AppBar, Divider, DropDownMenu, IconButton, IconMenu, LeftNav, MenuItem, RaisedButton,
			Toolbar, ToolbarGroup, ToolbarTitle} = require('material-ui');
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const HeadBar = React.createClass({
	getDefaultProps: function() {
		return {
			title: '乐乎问吧'
		};
	},
	getInitialState: function(){
		return {

		};
	},

	render: function() {
		let iconElementLeft = (
			<Link to="/">
				<IconButton tooltip="Home" touch={true}>
					<ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
				</IconButton>
			</Link>
		);
		let iconElementRight = (
			<IconMenu
				closeOnItemTouchTap={true}
				iconButtonElement={
					<IconButton>
						<NavigationMoreVert />
					</IconButton> }>
					<MenuItem
						primaryText={cookie.load('username')?"登出":"登录"}
						onTouchTap={this._handleLoginLogout}
						href="/askbar/login" />
				</IconMenu>
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
