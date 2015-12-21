'use strict';
require('.../style/css/shu_ask/QuestionAnswer.css');
const React = require('react');
const {Link, RouteHandler} = require('react-router');
const HeadBar = require('./HeadBar.jsx');
const {FlatButton, SelectField, TextField} = require('material-ui');

const QselectBtn = React.createClass({
	render: function() {
		let menuItems = [
			{ payload: '1', text: '新生入学' },
			{ payload: '2', text: '招生情况' },
			{ payload: '3', text: '学习制度' },
		  { payload: '4', text: '学生组织' }
		];
		let styles = {
			root: {
				width: '35%',
				top: 15,
				fontSize: 15
			}
		};
		return (
			<SelectField
				style={styles.root}
				/*{value={this.state.selectValue}
				onChange={this._handleSelectValueChange.bind(null, 'selectValue')}}*/
				menuItems={menuItems} />
		)
	}
})

const QrewardForm = React.createClass({
	render: function() {
		let style = {
			root: {
				width: 100,
				fontSize: 15
			}
		};
		return (
			<TextField
				style={style.root}
				hintText='1 ~ 1000'
				floatingLabelText='悬赏额' />
		)
	}
})

const TextForm = React.createClass({
	render: function() {
		let placeholder=[];
		let selects=[];
		if (this.props.type === 'question') {
			placeholder='问题描述';
		}
		else {
			placeholder='回答不超过300个汉字';
		}
		if (this.props.type == 'question') {
			selects.push(
				<ul>
					<QrewardForm />
					<QselectBtn />
				</ul>
			);
		}
		return (
			<div>
				<TextField
					multiLine={true}
					rows={8}
					floatingLabelText={placeholder} />
				{selects}
			</div>
		);
	}
});

const BtnGroup = React.createClass({
	render: function() {
		return (
			<div>
				<FlatButton label='取消' secondary={true} />
				<FlatButton label='提交' primary={true} />
			</div>
		);
	}
});

const Title = React.createClass({
	render:function() {
		let type = [];
		if (this.props.type === 'question') {
			type.push(
				<TextField
					floatingLabelText='提问标题' />
			);
		}
		else {
			type.push(
				<h5 className='title'>标题:
					{this.props.query}
				</h5>
			);
		}
		return (
			<div>
				{type}
			</div>
		)
	}
})

const Question = React.createClass({
	render: function() {
		return (
			<div>
				<HeadBar url= 'categories' />
				<div className='q-and-a-container'>
					<Title type='question' />
					<TextForm type='question' />
					<BtnGroup />
				</div>
			</div>
		);
	}
});

const Answer = React.createClass({
	render: function() {
		return (
			<div>
				<HeadBar url= 'categories' />
				<div className='q-and-a-container'>
					<Title type='answer' query={this.props.query.title} />
					<TextForm type='answer' />
					<BtnGroup />
				</div>
			</div>
		);
	}
});

module.exports = {
	Question: Question,
	Answer: Answer
}
