'use strict'
const React =require('react');
const cookie = require('react-cookie');
const {Link, RouteHandler} = require('react-router');
const {ActionSearch} = require('../../public/js/svg-icons.js');
const {AppBar, IconButton, LeftNav, MenuItem} = require('material-ui');
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const HeadBar = React.createClass({
	getDefaultProps: function() {
		return {
			title: '乐乎问吧',
			url:'categories'
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

	_handleLeftNavToggle: function() {
		this.setState({leftNavOpen: !this.state.leftNavOpen});
	},

	_handleLeftNavClose: function() {
		this.setState({leftNavOpen: false});
	},

	render: function() {
		return (
			<div>
				<AppBar
				  title={this.props.title}
					onLeftIconButtonTouchTap={this._handleLeftNavToggle} />
				<LeftNav ref="leftNav"
					openRight={true}
					open={this.state.leftNavOpen}
					onRequestChange={open => this.setState({open})}>
						{this.state.categories.map(category =>
							<MenuItem onTouchTap={this._categoryOnClick}>{category.name}</MenuItem>
						)}
				</LeftNav>
			</div>
		);
	}
});

module.exports = HeadBar;
