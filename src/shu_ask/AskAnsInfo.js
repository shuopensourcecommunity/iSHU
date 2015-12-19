'use strict';
require("../../style/css/shu_ask/AskAnsInfo.css");
var React = require('react');
var HeadBar = require('./HeadBar.js');
var {Link, RouteHandler} = require('react-router');

var QuestionContent = React.createClass({
  getInitialState: function(){
    return {
      question: [],
      bestAnswers: [],
      answers: [],
    };
  },
  loadQuestionFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        var t_bestAnswer = [];
        var t_answer = [];
        var question = [];
        question.push({
          'id': data.id,
          'askerUrl': data.asker.link,
          'title': data.title,
          'author': data.asker.name,
          'time': data.time,
          'endTime': data.end_time,
          'content': data.content,
          'answerNumber': data.answers.number,
          'price': data.price,
          'sectorName': data.sector.name,
          'sectorKey': data.sector.key,
        });
        for (var obj in data.answers.best_answer){
          t_bestAnswer.push({
            'url': data.answers.best_answer[obj]
          });
        }
        for (var obj in data.answers.answer){
          t_answer.push({
            'url': data.answers.answer[obj]
          });
        }
        this.setState(
          {
            question: question,
            bestAnswers: t_bestAnswer,
            answers: t_answer
          }
        );
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function(){
    this.loadQuestionFromServer();
  },
  render: function(){
    var QuestionContent = this.state.question.map(function(question) {
      var link_url = "/answer/"+question.id;
      return (
        <div className="container-question">
          <div className="page-header page-header-question">
            <h4>{question.title}</h4>
            <h5 className="question-author">{question.author}</h5>
            <h5 className="question-time">{question.time}</h5>
          </div>
          <p>{question.content}</p>
          <div className="question-card-bottom">
            <span className="answer-number">回答数<h className="badge">{question.answerNumber}</h></span>
            <span className="question-price">赏金<h className="badge">{question.price}</h></span>
            <Link to={link_url} query={{title: question.title}}>
              <div className="text-center i-want-to-answer">我要回答</div>
            </Link>
          </div>

        </div>
      );
    });
    return(
      <div>
        {QuestionContent}
      </div>
    )
  }
});

var AnswerTable = React.createClass({
  getInitialState: function(){
    return {
      against: [],
      agree: [],
      isBest: [],
      answers: [],
      bestAnswers: [],
    };
  },
  loadAnswersFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        var t_agree = [];
        var t_against = [];
        var t_isBest = [];
        var t_answer = [];
        var t_bestAnswer = [];
        for (var obj in data.data){
          var bestAnswerStatus = JSON.parse(data.data[obj].isBest);
          if (bestAnswerStatus){
            t_bestAnswer.push({
              'question_id': data.question_id,
              'answer_id': data.data[obj].answer_id,
              'author': data.data[obj].name,
              'time': data.data[obj].time,
              'agree': data.data[obj].agree,
              'against': data.data[obj].disagree,
              'content': data.data[obj].content,
            });
          }
          t_answer.push({
            'question_id': data.question_id,
            'answer_id': data.data[obj].answer_id,
            'author': data.data[obj].name,
            'time': data.data[obj].time,
            'agree': data.data[obj].agree,
            'against': data.data[obj].disagree,
            'content': data.data[obj].content,
          });
          t_agree.push(false);
          t_against.push(false);
          t_isBest.push(bestAnswerStatus);
        }
        this.setState({
          answers: t_answer,
          bestAnswers: t_bestAnswer,
          agree: t_agree,
          against: t_against,
          isBest: t_isBest,
        });
        console.log("isBest status initial load: " + this.state.isBest);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function(){
    this.loadAnswersFromServer();
  },

  againstClick: function(id, event) {
    var purl= 'answer'+id;
    if (!this.state.against[id]) {
      this.state.against[id] = true;
      this.state.agree[id] = false;
      $.ajax({
        url: purl,
        dataType: 'json',
        type: 'post',
        success: function(data) {
          this.setState({'disagree': '1'});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
    else {
      this.state.against[id] = false;
      $.ajax({
        url: purl,
        dataType: 'json',
        type: 'post',
        success: function(data) {
          this.setState({'disagree': '0'});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  },
  agreeClick: function(id, event) {
    var purl= 'answer'+id;
    if (!this.state.agree[id]) {
      this.state.against[id] = false;
      this.state.agree[id] = true;
      $.ajax({
        url: purl,
        dataType: 'json',
        type: 'post',
        success: function(data) {
          this.setState({'pagree': '1'});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
    else {
      this.state.agree[id] = false;
      $.ajax({
        url: purl,
        dataType: 'json',
        type: 'post',
        success: function(data) {
        this.setState({'pagree': '0'});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  },
  handleBestClick: function(id, bestStatus, event){
    console.log("isBest status: " + this.state.isBest);
    $.post(
      'answer'+id,
      {'isBest': !bestStatus},
      function(data,status){
        this.state.isBest[id-1] = !bestStatus;
        this.setState({'pbest':!bestStatus});
        console.log("isBest status: " + this.state.isBest + "\n状态：" + status);
      }.bind(this)
    );
  },
  render: function(){
    // ATTENTION: .btn-set-best/.btn-cancel-best(设为最佳答案/取消最佳答案) can only be seen by the asker.
    var answers = this.state.answers.map(function(answer){
      var id=answer.answer_id;
      var agreeText = parseInt(answer.agree);
      if (this.state.agree[id]) agreeText=agreeText+1;
      var againstText = parseInt(answer.against);
      if (this.state.against[id]) againstText=againstText+1;
      var bestStr = this.state.isBest[id-1] ? '取消最佳' : '设为最佳';
      return (
        <div className="container-answer-card">
          <div className="page-header page-header-answer">
            <h5 className="answer-author">{answer.author}</h5>
            <h5 className="answer-time">{answer.time}</h5>
            <button type="button" className="btn btn-link btn-set-best" onClick={this.handleBestClick.bind(this, id, this.state.isBest[id-1])}>{bestStr}</button>
            <br />
            <span>
              <a className="answer-agree" onClick={this.agreeClick.bind(this, id)}>支持<h className="badge">{agreeText}</h></a>
              <a className="answer-against" onClick={this.againstClick.bind(this, id)}>反对<h className="badge">{againstText}</h></a>
            </span>
          </div>
          <p>{answer.content}</p>
        </div>
      )
    },this);
    var bestAnswers = this.state.bestAnswers.map(function(answer){
      var id=answer.answer_id;
      var agreeText = JSON.parse(answer.agree);
      if (this.state.agree[id]) agreeText=agreeText+1;
      var againstText = JSON.parse(answer.against);
      if (this.state.against[id]) againstText=againstText+1;
      var bestStr = this.state.isBest[id-1] ? '取消最佳' : '设为最佳';
      return (
        <div className="container-answer-card">
          <div className="page-header page-header-answer">
            <h5 className="answer-author">{answer.author}</h5>
            <h5 className="answer-time">{answer.time}</h5>
            <button type="button" className="btn btn-link btn-set-best" onClick={this.handleBestClick.bind(this, id, this.state.isBest[id-1])}>{bestStr}</button>
            <br />
            <span>
              <a className="answer-agree" onClick={this.agreeClick.bind(this, id)}>支持<span className="badge">{agreeText}</span></a>
              <a className="answer-against" onClick={this.againstClick.bind(this, id)}>反对<h className="badge">{againstText}</h></a>
            </span>
          </div>
          <p>{answer.content}</p>
        </div>
      )
    },this);
    return (
      <div className="container-answer-table">
        <div className="bestAnswers">
          <div className="h4 bestAnswerTitle">最佳回答</div>
          {bestAnswers}
        </div>
        <div className="allAnswers">
          <div className="h4 allAnswerTitle">所有回答</div>
          {answers}
        </div>
      </div>
    );
  }
});

var AskAnsInfo = React.createClass({
	render: function(){
    var qcontent_url = "question"+this.props.params.id;
		return(
      <div className="container">
        <HeadBar url = 'categories' />
        <QuestionContent url = {qcontent_url} />
        <AnswerTable url = "answers"/>
      </div>
		);
	}
});

module.exports = AskAnsInfo;
