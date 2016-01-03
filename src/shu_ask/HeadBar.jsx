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
			url:'categories',
			title: '乐乎问吧',
			cid: 1
		};
	},
	getInitialState: function(){
		return {
			categories: [],
			leftNavOpen: false
		};
	},
	loadCategoriesFromServer: function() {
		// category = [ "ID": 1, "Name": "招生情况", "SortID": 1, "Mid": null ]
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			methods: 'get',
			success: function(data) {
				let t_categories = [];
				for (let obj in data.Data){
					console.log(data.Data[obj]);
					t_categories.push({
						'id': data.Data[obj].ID,
						'name': data.Data[obj].Name
					});
				}
				// console.log(data);
				// console.log(t_categories);
				this.setState({ categories: t_categories });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	componentDidMount: function() {
		this.loadCategoriesFromServer();
	},

	_categoryOnClick: function() {
		this.setState({
			leftNavOpen: false,
			// cid: cur_cid
		});
	},

	render: function() {
		return (
			<div>
				<AppBar
					title={this.props.title}
					showMenuIconButton={true}
          iconElementLeft= {
            <Link to="/">
              <IconButton tooltip="Home" touch={true}>
                <ActionHome color={Colors.white} hoverColor={Colors.cyan900} />
              </IconButton>
            </Link>
					}
					iconElementRight= {
            <IconMenu
              closeOnItemTouchTap={true}
              iconButtonElement={
                <IconButton>
                  <NavigationMoreVert />
                </IconButton> }>
								<MenuItem
									primaryText={cookie.load('username')?"登出":"登录"}
									onTouchTap={this._handleLoginLogout} />
							</IconMenu>
					} />
				<Toolbar>
					<ToolbarGroup firstChild={true} float="left">
						<a href='/ishu'><IconButton tooltip="返回 iSHU"> <HardwareKeyboardArrowLeft /> </IconButton></a>
					</ToolbarGroup>
					<ToolbarGroup lastChild={true} float="right">

							<DropDownMenu value={this.props.cid}>
								{this.state.categories.map(category =>
									<MenuItem value={category.id} onTouchTap={this._categoryOnClick} primaryText={category.name} />
								)}
							</DropDownMenu>
							<RaisedButton label="我要提问" primary={true} />
					</ToolbarGroup>
				</Toolbar>
			</div>
		);
	}
});

module.exports = HeadBar;
