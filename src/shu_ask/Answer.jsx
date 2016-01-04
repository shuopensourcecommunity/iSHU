'use strict';
require('../../style/css/shu_ask/QuestionAnswer.css');
const HeadBar = require('./HeadBar.jsx');
const React = require('react');
const cookie = require('react-cookie');
const {Link, RouteHandler} = require('react-router');
const {Card, CardActions, CardHeader, CardText, FlatButton, TextField} = require('material-ui');

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

module.exports = Answer;
