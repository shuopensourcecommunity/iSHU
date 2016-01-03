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
		console.log(e);
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

	render: function() {
		let iconElementLeft = (
			<Link to="/">
				<IconButton tooltip="Home" touch={true}>
					<ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
				</IconButton>
			</Link>
		);
		let iconElementRight = (
			<div>
				<IconButton onClick={this.show}>
					<NavigationMoreVert color={Colors.white} hoverColor={Colors.cyan900} />
				</IconButton>

				<Popover open={this.state.activePopover}
				  anchorEl={this.state.anchorEl}
				  onRequestClose={this.closePopover} >
				  <div style={{padding:10, width:200, textAlign:'center'}}>
				    <p>您好，请登陆乐乎问吧</p>
				    <Link to='login'><RaisedButton primary={true} label="登录" /></Link>
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
