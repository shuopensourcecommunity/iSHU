'use strict';
require('../../style/css/shu_ask/QuestionAnswer.css');
const HeadBar = require('./HeadBar.jsx');
const React = require('react');
const cookie = require('react-cookie');
const {Link, RouteHandler} = require('react-router');
const {Card, CardActions, CardHeader, CardText, FlatButton, RaisedButton, SelectField, TextField, menuItems, DropDownMenu} = require('material-ui');

const QselectBtn = React.createClass({
	getInitialState: function(){
		return {
			guid: cookie.load('guid')?cookie.load('guid'):'',
			ask_title: '',
			ask_content: '',
			ask_cid: 1,
			values: [
				{ payload: '1', text: '新生入学' },
				{ payload: '2', text: '招生情况' },
				{ payload: '3', text: '学习制度' },
		  		{ payload: '4', text: '学生组织' }
			],
			selectValue: null
		};
	},
	_handleSelectValueChange: function(){
		this.setState({selectValue});
	},
	render: function() {
		let styles = {
			root: {
				width: 100,
				fontSize: 13
			}
		};
		return (
			<SelectField
				style={styles.root}
				value={this.state.selectvalue}
				valueMember="payload"
				displayMember="text"
				menuItems={this.state.values}
				onChange={this._handleSelectValueChange.bind(null, 'values')} />
		)
	}
});

const QrewardForm = React.createClass({
	render: function() {
		let style = {
			root: {
				width: 100,
				fontSize: 13
			}
		};
		return (
			<TextField
				style={style.root}
				hintText='1 ~ 1000'
				floatingLabelText='悬赏额' />
		)
	}
});

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
					<QselectBtn />
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
			<div className='BtnGroup'>
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
				<HeadBar title='提问' />
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
	getInitialState: function() {
		return {
			qid: 0,
			qTitle: '',
			qContent: '',
			ansValue: ''
		}
	},

	loadQuestionFromServer: function() {
    $.ajax({
      url: 'getQuestionDetailById',
      data: {
        questionId: parseInt(this.props.params.id)
      },
      dataType: 'json',
      methods: 'get',
      success: function(data) {
				console.log(data);
        this.setState({
          qid: data.Data.id,
          qTitle: data.Data.title,
          qContent: data.Data.content,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

	componentDidMount: function() {
		this.loadQuestionFromServer();
	},

	handleAnsValue: function(e) {
		this.setState({ansValue: e.target.value});
	},

	handleSubmitAnswer: function() {
		console.log(this.state.ansValue);
		let data = {
			'guid': cookie.load('guid'),
			'content': this.state.ansValue,
			'questionId': this.state.qid
		};
		$.ajax({
			url: 'submitAnswer',
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
				console.log(data);
				console.log('回答成功');
      }.bind(this),
      error: function(xhr, status, err) {
				console.log('回答失败');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
		});
	},

	render: function() {
		console.log(this.props.params.id);

		return (
			<div>
				<HeadBar title='回答' />
				<div className='q-and-a-container'>
					<Card style={{height: '100%'}}>
				    <CardHeader title={this.state.qTitle} />
				    <CardText> <div dangerouslySetInnerHTML={{__html: this.state.qContent }} ></div> </CardText>
							<TextField
								multiLine={true}
								rows={8}
								floatingLabelText='ans'
								onChange={this.handleAnsValue} />
							<CardActions>
								<FlatButton label='取消' secondary={true} />
								<FlatButton label='提交' primary={true} onTouchTap={this.handleSubmitAnswer} />
							</CardActions>

				  </Card>

				</div>
			</div>
		);
	}
});

module.exports = {
	Question: Question,
	Answer: Answer
}
