'use strict';
require('../../style/css/shu_ask/QuestionAnswer.css');
const HeadBar = require('./HeadBar.jsx');
const React = require('react');
const cookie = require('react-cookie');
const {CardHeader, CardText, Divider, FlatButton, TextField} = require('material-ui');

const styles = {
	cardTitle: { fontSize: 20 },
	cardHeader: { height: 50 },
	answerAction: { textAlign: 'center' },
	textField: { textAlign: 'left' },
	textInput: {
		paddingLeft: 16,
		paddingRight: 16
	},
	floatingLabel: { paddingLeft: 16 }
};

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
        this.setState({
          qid: data.Data.id,
          qTitle: data.Data.title,
          qContent: data.Data.content
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

  handleAnsValue: function(event) {
    this.setState({ansValue: event.target.value});
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
          window.location.href = '#AskAnsInfo/' + this.props.params.id;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleReturn: function() {
    window.location.href= '/askbar/#/AskAnsInfo/' + this.props.params.id;
  },

  render: function() {
    console.log(this.props.params.id);
    return (
      <div>
        <HeadBar title='回答' />
        <div>
          <CardHeader title={this.state.qTitle} style={styles.cardHeader} titleStyle={styles.cardTitle}/>
          <CardText> <div dangerouslySetInnerHTML={{__html: this.state.qContent }} ></div> </CardText>
          <Divider />
          <div style={styles.answerAction}>
            <TextField
              style={styles.textField}
              inputStyle={styles.textInput}
              floatingLabelStyle={styles.floatingLabel}
              fullWidth={true}
              multiLine={true}
              rows={8}
              floatingLabelText='请输入您的回答'
              onChange={this.handleAnsValue} />
            <br />
            <FlatButton label='返回' secondary={true} onTouchTap={this.handleReturn}/>
            <FlatButton label='提交' primary={true} onTouchTap={this.handleSubmitAnswer} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Answer;
