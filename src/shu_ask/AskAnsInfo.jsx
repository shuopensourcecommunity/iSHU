'use strict';
const HeadBar = require('./HeadBar.jsx');
const React =require('react');
const cookie = require('react-cookie');
const {Link, RouteHandler} = require('react-router');
const {Card, CardActions, CardHeader, CardText, FlatButton, RaisedButton,
  Toolbar, ToolbarGroup, ToolbarTitle} = require('material-ui');

const styles = {
  tbText: {
    paddingLeft: 16,
    fontSize: 15
  },
  cardHeader: { height: 50 },
  cardTitle: { fontSize: 20 },
  hide: { display: 'none' },
  show: { display: '' }
};

const QuestionContent = React.createClass({
  getInitialState: function() {
    return {
      answer_number: 0,
      category_id: 0,
      id: 0,
      price: 0,
      userId: 0,
      userName: '',
      updatedTime: '',
      title: '',
      content: '',
    };
  },

  loadQuestionFromServer: function() {
    $.ajax({
      url: 'getQuestionDetailById',
      data: {
        questionId: this.props.questionId
      },
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        console.log(data);
        this.setState({
          answer_number: data.Data.answer_number,
          category_id: data.Data.category_id,
          id: data.Data.id,
          price: data.Data.price,
          userId: data.Data.user_id,
          userName: data.Data.user_name,
          updatedTime: data.Data.updated_time,
          title: data.Data.title,
          content: data.Data.content
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

  render: function() {
    let question = this.state;
    let tbText = '共 ' + question.answer_number + ' 个回答  赏金 ' + question.price;
    let QuestionToolbar = (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <ToolbarTitle text={tbText} style={styles.tbText} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} float="right">
          <RaisedButton linkButton={true} href={'/askbar/#/answer/'+question.id} label="我要回答" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
    let QuestionContent = (
      <Card>
        <CardHeader style={styles.cardHeader} title={question.title} titleStyle={styles.cardTitle} />
        <CardText>
          <div dangerouslySetInnerHTML={{__html:  question.content }} ></div>
          <p>{question.userName} {question.updatedTime}</p>
        </CardText>
      </Card>
    );
    return(
      <div>
        {QuestionToolbar}
        {QuestionContent}
      </div>
    )
  }
});

const AnswerTable = React.createClass({
  getInitialState: function(){
    return {
      disagree: [],
      agree: [],
      isBest: [],
      answers: [],
      bestAnswers: [],
      bestAnsNum: -1,
      ansNum: -1
    };
  },

  loadAnswersFromServer: function(){
    let data = {
      'questionId': this.props.questionId,
      'type': 'answers'
    };
    $.ajax({
      url: 'getQuestionAnswers',
      data: data,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        console.log(data);
        let t_agree = [];
        let t_disagree = [];
        let t_answer = [];
        let t_bestAnswer = [];
        let t_bestAnsNum = 0;
        let t_ansNum = 0;
        for (let obj in data.Data) {
          t_ansNum++;
          t_answer.push({
            'answerId': data.Data[obj].answerId,
            'author': data.Data[obj].user_name,
            'time': data.Data[obj].time,
            'agree': data.Data[obj].agree,
            'disagree': data.Data[obj].disagree,
            'is_best': data.Data[obj].is_best,
            'content': data.Data[obj].content
          });
          let id = JSON.parse(data.Data[obj].answerId);
          this.state.isBest[id] = false;
          t_agree.push(false);
          t_disagree.push(false);
        }
        this.setState({
          answers: t_answer,
          ansNum: t_ansNum,
          agree: t_agree,
          disagree: t_disagree,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadBestAnswersFromServer: function(){
    let data = {
      'questionId': this.props.questionId,
      'type': 'bestAnswers'
    };
    $.ajax({
      url: 'getQuestionBestAnswers',
      data: data,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        console.log(data);
        let t_agree = [];
        let t_disagree = [];
        let t_answer = [];
        let t_bestAnswer = [];
        let t_bestAnsNum = 0;
        let t_ansNum = 0;
        for (let obj in data.Data) {
          t_bestAnsNum++;
          t_bestAnswer.push({
            'answerId': data.Data[obj].answerId,
            'author': data.Data[obj].user_name,
            'time': data.Data[obj].time,
            'agree': data.Data[obj].agree,
            'disagree': data.Data[obj].disagree,
            'is_best': data.Data[obj].is_best,
            'content': data.Data[obj].content
          });
          let id = JSON.parse(data.Data[obj].answerId);
          this.state.isBest[id] = false;
          t_agree.push(false);
          t_disagree.push(false);
        }
        this.setState({
          bestAnswers: t_bestAnswer,
          bestAnsNum: t_bestAnsNum,
          agree: t_agree,
          disagree: t_disagree,
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
  // TODO update agree, disagree and set_best
  disagreeClick: function(id, event) {
      var data = {
        guid: cookie.load('guid'),
        answerId: id
      };
      console.log(data);
      this.state.disagree[id] = true;
      this.state.agree[id] = false;
      $.ajax({
        url: 'dislikeAnswer',
        dataType: 'json',
        method: 'post',
        data: data,
        success: function(data) {
          console.log(data);
          this.setState({'disagree': '1'});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  },
  agreeClick: function(id, event) {
      var data = {
        guid: cookie.load('guid'),
        answerId: id
      };
      console.log(data);
      this.state.disagree[id] = false;
      this.state.agree[id] = true;
      $.ajax({
        url: 'likeAnswer',
        dataType: 'json',
        method: 'post',
        data: data,
        success: function(data) {
          console.log(data);
          this.setState({'pagree': '1'});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  },
  handleBestClick: function(id, is_best, event){
    this.state.isBest[id] = !is_best;
    console.log('answer' + id + ' is best: ' + this.state.isBest[id]);
    var data = {
      guid: cookie.load('guid'),
      answerId: id
    };
    $.ajax({
      url: 'setBestAnswer',
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
        console.log(data);
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
    let cardtitle = answer.author;
    let subtitle = answer.time;
    return (
      <Card key={id}>
        <CardHeader style={styles.cardHeader} title={cardtitle} subtitle={subtitle} />
        <CardActions>
          <FlatButton label={'支持 '+agreeText} onClick={this.agreeClick.bind(this, id)} />
          <FlatButton label={'反对 '+disagreeText} onClick={this.disagreeClick.bind(this, id)} />
          <FlatButton label={set_best} primary={true} onTouchTap={this.handleBestClick.bind(this, id, is_best)} />
        </CardActions>
        <CardText>
          <div dangerouslySetInnerHTML={{__html:  answer.content }} ></div>
        </CardText>
      </Card>
    )
  },

  render: function(){
    let answers = this.state.answers.map(this.answerList,this);
    let bestAnswers = this.state.bestAnswers.map(this.answerList,this);
    let bestZero = (this.state.bestAnsNum==0);
    let ansZero = (this.state.ansNum==0);
    let initBestZero = (this.state.bestAnsNum==-1);
    let initAnsZero = (this.state.ansNum==-1);
    return (
      <div>
        <div style={bestZero?styles.hide:styles.show}>
          <Toolbar><ToolbarTitle firstChild={true} text='最佳回答' style={styles.tbText} /></Toolbar>
          {bestAnswers}
        </div>
        <div style={ansZero?styles.hide:styles.show}>
          <Toolbar><ToolbarTitle firstChild={true} text='其它回答' style={styles.tbText} /></Toolbar>
          {answers}
        </div>
        <div style={{textAlign: 'center'}}>
          <p style={bestZero&&ansZero?styles.show:styles.hide}>该问题暂无答案</p>
          <p style={initBestZero&&initAnsZero?styles.show:styles.hide}>Loading...</p>
        </div>
      </div>
    );
  }
});

const AskAnsInfo = React.createClass({
  render: function() {
    return (
      <div>
        <HeadBar title='问题详情' />
        <QuestionContent questionId={this.props.params.id} />
        <AnswerTable questionId={this.props.params.id} />
      </div>
    );
  }
});

module.exports = AskAnsInfo;
