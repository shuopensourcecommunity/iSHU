'use strict';
const React =require('react');
const {Link, RouteHandler} = require('react-router');
const HeadBar = require('./HeadBar.jsx');
const {Card, CardActions, CardText, CardTitle, FlatButton} = require('material-ui');

const QuestionContent = React.createClass({
  getInitialState: function(){
    return {
      question: [],
      bestAnswers: [],
      answers: []
    };
  },
  loadQuestionFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        let t_bestAnswer = [];
        let t_answer = [];
        let question = [];
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
        for (let obj in data.answers.best_answer){
          t_bestAnswer.push({
            'url': data.answers.best_answer[obj]
          });
        }
        for (let obj in data.answers.answer){
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
    let QuestionContent = this.state.question.map(function(question) {
       let answer_link = '/answer/'+question.id;
       let subtitle = '提问人：' + question.author + '  ' + question.time;
       return (
         <Card>
           <CardTitle title={question.title} subtitle={subtitle} />
           <CardText>
             {question.content}
           </CardText>
           <CardText>
             <span>共 {question.answerNumber} 个回答 赏金 {question.price}</span>
             <FlatButton label='我要回答' primary={true} linkButton={true}/>
           </CardText>
         </Card>
       )
    });
    return(
      <div>
        {QuestionContent}
      </div>
    )
  }
});

const AnswerTable = React.createClass({
  getInitialState: function(){
    return {
      against: [],
      agree: [],
      isBest: [],
      answers: [],
      bestAnswers: [],
    };
  },

  loadBestAnswersFromServer: function(){
    $.ajax({
      url: this.props.bestAnswerUrl,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        let t_agree = [];
        let t_against = [];
        let t_bestAnswer = [];
        for (let obj in data.data){
          t_bestAnswer.push({
            'question_id': data.question_id,
            'answer_id': data.data[obj].answer_id,
            'author': data.data[obj].name,
            'time': data.data[obj].time,
            'agree': data.data[obj].agree,
            'against': data.data[obj].disagree,
            'content': data.data[obj].content,
          });
          let id = JSON.parse(data.data[obj].answer_id);
          this.state.isBest[id] = true;
          t_agree.push(false);
          t_against.push(false);

        }
        this.setState({
          bestAnswers: t_bestAnswer,
          agree: t_agree,
          against: t_against,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadAnswersFromServer: function(){
    $.ajax({
      url: this.props.answerUrl,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        let t_agree = [];
        let t_against = [];
        let t_answer = [];
        for (let obj in data.data){
          t_answer.push({
            'question_id': data.question_id,
            'answer_id': data.data[obj].answer_id,
            'author': data.data[obj].name,
            'time': data.data[obj].time,
            'agree': data.data[obj].agree,
            'against': data.data[obj].disagree,
            'content': data.data[obj].content,
          });
          let id = JSON.parse(data.data[obj].answer_id);
          this.state.isBest[id] = false;
          t_agree.push(false);
          t_against.push(false);
        }
        this.setState({
          answers: t_answer,
          agree: t_agree,
          against: t_against,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function(){
    this.loadAnswersFromServer();
    this.loadBestAnswersFromServer();
  },

  againstClick: function(id, event) {
    let purl= 'answer'+id;
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
    let purl= 'answer'+id;
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
    let purl= 'answer'+id;
    this.state.isBest[id] = !bestStatus;
    console.log('answer' + id + ' is best: ' + this.state.isBest[id]);
    $.ajax({
      url: purl,
      dataType: 'json',
      type: 'post',
      data: {'isBest': !bestStatus},
      success: function(data) {
        this.setState({'pbest':!bestStatus});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    // ATTENTION: .btn-set-best/.btn-cancel-best(设为最佳答案/取消最佳答案) can only be seen by the asker.
    let answers = this.state.answers.map(function(answer){
      let id=answer.answer_id;
      let agreeText = parseInt(answer.agree);
      if (this.state.agree[id]) agreeText=agreeText+1;
      let againstText = parseInt(answer.against);
      if (this.state.against[id]) againstText=againstText+1;
      let bestStatus = this.state.isBest[id];
      let bestStr = bestStatus ? '取消最佳' : '设为最佳';
      let cardtitle = answer.author+'  '+answer.time;
      return (
        <Card>
          <CardTitle subtitle={cardtitle} />
          <CardActions>
            <span>
              <a onClick={this.agreeClick.bind(this, id)}>支持<h>{agreeText}</h></a>
              <a onClick={this.againstClick.bind(this, id)}>反对<h>{againstText}</h></a>
            </span>
            <FlatButton label={bestStr} primary={true} onTouchTap={this.handleBestClick.bind(this, id, bestStatus)} />
          </CardActions>
          <CardText>
            {answer.content}
          </CardText>
        </Card>
      )
    },this);
    let bestAnswers = this.state.bestAnswers.map(function(answer){
      let id=answer.answer_id;
      let agreeText = JSON.parse(answer.agree);
      if (this.state.agree[id]) agreeText=agreeText+1;
      let againstText = JSON.parse(answer.against);
      if (this.state.against[id]) againstText=againstText+1;
      let bestStatus = this.state.isBest[id];
      let bestStr = bestStatus ? '取消最佳' : '设为最佳';
      let cardtitle = answer.author+'  '+answer.time;
      return (
        <Card>
          <CardTitle subtitle={cardtitle} />
          <CardActions>
            <span>
              <a onClick={this.agreeClick.bind(this, id)}>支持<h>{agreeText}</h></a>
              <a onClick={this.againstClick.bind(this, id)}>反对<h>{againstText}</h></a>
            </span>
            <FlatButton label={bestStr} primary={true} onTouchTap={this.handleBestClick.bind(this, id, bestStatus)} />
          </CardActions>
          <CardText>
            {answer.content}
          </CardText>
        </Card>
      )
    },this);
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
    let qcontent_url = 'question'+this.props.params.id;
		return(
      <div>
        <HeadBar url='categories' />
        <QuestionContent url={qcontent_url} />
        <AnswerTable answerUrl='answers' bestAnswerUrl='bestAnswers' />
      </div>
		);
	}
});

module.exports = AskAnsInfo;
