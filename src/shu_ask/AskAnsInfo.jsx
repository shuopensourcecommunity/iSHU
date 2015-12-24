'use strict';
const HeadBar = require('./HeadBar.jsx');
const React =require('react');
const {Link, RouteHandler} = require('react-router');
const {Card, CardActions, CardText, CardTitle, FlatButton} = require('material-ui');

// TODO request the question detail with a questuinId
const QuestionContent = React.createClass({
  getDefaultProps: function() {
    return {
      ans_url: 'getAnswerByQuestionId'
    }
  },

  getInitialState: function() {
    return {
      question: []
    };
  },

  // loadQuestionFromServer: function() {
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     methods: 'get',
  //     success: function(data) {
  //       let t_bestAnswer = [];
  //       let t_answer = [];
  //       let question = [];
  //       question.push({
  //         'id': data.id,
  //         'askerUrl': data.asker.link,
  //         'title': data.title,
  //         'author': data.asker.name,
  //         'time': data.time,
  //         'endTime': data.end_time,
  //         'content': data.content,
  //         'answerNumber': data.answers.number,
  //         'price': data.price,
  //         'sectorName': data.sector.name,
  //         'sectorKey': data.sector.key,
  //       });
  //       this.setState({
  //         question: question
  //       });
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  //
  // componentDidMount: function(){
  //   this.loadQuestionFromServer();
  // },
  render: function(){
    // let QuestionContent = this.state.question.map(function(question) {
    //    let answer_link = '/answer/'+question.id;
    //    let subtitle = '提问人：' + question.author + '  ' + question.time;
    //    return (
    //      <Card>
    //        <CardTitle title={question.title} subtitle={subtitle} />
    //        <CardText>
    //          {question.content}
    //        </CardText>
    //        <CardText>
    //          <span>共 {question.answerNumber} 个回答 赏金 {question.price}</span>
    //          <FlatButton label='我要回答' primary={true} linkButton={true}/>
    //        </CardText>
    //      </Card>
    //    )
    // });
    return(
      <div>
        123
      </div>
    )
  }
});

const AnswerTable = React.createClass({
  getDefaultProps: function() {
    return {
      url: 'getAnswerByQuestionId'
    }
  },

  getInitialState: function(){
    return {
      disagree: [],
      agree: [],
      isBest: [],
      answers: [],
      bestAnswers: []
    };
  },

  loadAnswersFromServer: function(){
    $.ajax({
      url: this.props.url,
      data: {
        'questionId': this.props.questionId,
        'type': 'answers'
      },
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        console.log(data);
        let t_agree = [];
        let t_disagree = [];
        let t_answer = [];
        let t_bestAnswer = [];
        for (let obj in data.Data){
          // console.log(data.Data[obj].is_best);
          if (data.Data[obj].is_best) {
            t_bestAnswer.push({
              'answerId': data.Data[obj].answerId,
              'author': data.Data[obj].name,
              'time': data.Data[obj].time,
              'agree': data.Data[obj].agree,
              'disagree': data.Data[obj].disagree,
              'is_best': data.Data[obj].is_best,
              'content': data.Data[obj].content
            });
          }
          else {
            t_answer.push({
              'answerId': data.Data[obj].answerId,
              'author': data.Data[obj].name,
              'time': data.Data[obj].time,
              'agree': data.Data[obj].agree,
              'disagree': data.Data[obj].disagree,
              'is_best': data.Data[obj].is_best,
              'content': data.Data[obj].content
            });
          }
          let id = JSON.parse(data.Data[obj].answerId);
          // this.state.isBest[id] = false;
          t_agree.push(false);
          t_disagree.push(false);
        }
        this.setState({
          answers: t_answer,
          bestAnswers: t_bestAnswer,
          agree: t_agree,
          disagree: t_disagree
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function(){
    this.loadAnswersFromServer();
  },
  // TODO update agree, disagree and set_best
  disagreeClick: function(id, event) {
    let purl= 'answer'+id;
    if (!this.state.disagree[id]) {
      this.state.disagree[id] = true;
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
      this.state.disagree[id] = false;
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
    let purl= 'answer'+id;
    if (!this.state.agree[id]) {
      this.state.disagree[id] = false;
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
  handleBestClick: function(id, is_best, event){
    let purl= 'answer'+id;
    this.state.isBest[id] = !is_best;
    console.log('answer' + id + ' is best: ' + this.state.isBest[id]);
    $.ajax({
      url: purl,
      dataType: 'json',
      type: 'post',
      data: {'isBest': !is_best},
      success: function(data) {
        this.setState({'pbest':!is_best});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  answerList: function(answer) {
    // ATTENTION: 设为最佳答案/取消最佳答案 can only be seen by the asker.
    console.log(answer.is_best);
    let id=answer.answerId;
    let agreeText = parseInt(answer.agree);
    if (this.state.agree[id]) agreeText=agreeText+1;
    let disagreeText = parseInt(answer.disagree);
    if (this.state.disagree[id]) disagreeText=disagreeText+1;
    let is_best = answer.is_best;
    let set_best = is_best ? '取消最佳' : '设为最佳';
    let cardtitle = answer.author+'  '+answer.time;
    return (
      <Card>
        <CardTitle subtitle={cardtitle} />
        <CardActions>
          <span>
            <a onClick={this.agreeClick.bind(this, id)}>支持<h>{agreeText}</h></a>
            <a onClick={this.disagreeClick.bind(this, id)}>反对<h>{disagreeText}</h></a>
          </span>
          <FlatButton label={set_best} primary={true} onTouchTap={this.handleBestClick.bind(this, id, is_best)} />
        </CardActions>
        <CardText>
          {answer.content}
        </CardText>
      </Card>
    )
  },

  render: function(){
    let answers = this.state.answers.map(this.answerList,this);
    let bestAnswers = this.state.bestAnswers.map(this.answerList,this);
    return (
      <div>
        <Card initiallyExpanded={true} expandable={true}>
          <CardTitle title='最佳回答' />
          {bestAnswers}
        </Card>
        <Card initiallyExpanded={true} expandable={true}>
          <CardTitle title='其他回答' />
          {answers}
        </Card>
      </div>
    );
  }
});

const AskAnsInfo = React.createClass({
  render: function() {
    console.log(this.props.params.id);
    return (
      <div>
        <HeadBar title='问题详情' />
        <QuestionContent />
        <AnswerTable questionId={this.props.params.id} />
      </div>
    );
  }
});

module.exports = AskAnsInfo;
