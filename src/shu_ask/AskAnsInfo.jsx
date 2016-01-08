'use strict';
const HeadBar = require('./HeadBar.jsx');
const React =require('react');
const cookie = require('react-cookie');
const {Link, RouteHandler} = require('react-router');
const {Card, CardActions, CardHeader, CardText, FlatButton, RaisedButton,
  Toolbar, ToolbarGroup, ToolbarTitle} = require('material-ui');
const AskBarAuth = require('./authentication.jsx');

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
var is_owner = false;

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
      content: ''
    };
  },

  loadQuestionFromServer: function() {
    $.ajax({
      url: 'getQuestionDetail',
      data: {
        questionId: this.props.questionId
      },
      dataType: 'json',
      methods: 'get',
      success: function(data) {
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
        is_owner = data.is_owner;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadQuestionFromServer();
  },

  _handleAsk: function(){
    if (cookie.load('username')){
      /*  current user has login */
      let question =this.state;
      window.location.href = '#answer/' + question.id ;
    }else{
      window.location.href ='#login';
    }
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
          <RaisedButton onTouchTap={this._handleAsk} label="我要回答" primary={true}/>
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

const AnswerBtn = React.createClass({
  getInitialState: function(){
    return {
      disagree: false,
      agree: false
    };
  },
  disagreeClick: function(id, event) {
    $.ajax({
      url: 'dislikeAnswer',
      dataType: 'json',
      method: 'post',
      data: {
        answerId: id,
        guid: cookie.load('guid')
      },
      success: function(data) {
        console.log(data);
        if (data.State=='success') {
          this.setState({disagree: true});
        }
        else {
          alert(data.Msg);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        alert('(　ﾟдﾟ)操作失败了');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  agreeClick: function(id, event) {
    $.ajax({
      url: 'likeAnswer',
      dataType: 'json',
      method: 'post',
      data: {
        answerId: id,
        guid: cookie.load('guid')
      },
      success: function(data) {
        console.log(data);
        if (data.State=='success') {
          this.setState({agree: true});
        }
        else {
          alert(data.Msg);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        alert('(　ﾟдﾟ)操作失败了');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleBestClick: function(id, event){
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
        // console.log(data);
        if (data.State=='success') {
          location.reload();
        }
        else {
          alert(data.Data);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        alert('(　ﾟдﾟ)操作失败了');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    let id = this.props.id;
    let btn_disabled = false;
    let agreeText = this.props.agreeText;
    if (this.state.agree) {
      agreeText=agreeText+1;
      btn_disabled = true;
    }
    let disagreeText = this.props.disagreeText;
    if (this.state.disagree) {
      disagreeText=disagreeText+1;
      btn_disabled = true;
    }
    let is_best = this.state.is_best;
    return is_owner&&(!this.props.is_best)?(
      <CardActions>
        <FlatButton label={'支持 '+agreeText} disabled={btn_disabled} onClick={this.agreeClick.bind(this, id)} />
        <FlatButton label={'反对 '+disagreeText} disabled={btn_disabled} onClick={this.disagreeClick.bind(this, id)} />
        <FlatButton label='设为最佳' primary={true} onTouchTap={this.handleBestClick.bind(this, id)} />
      </CardActions>
    ):
    (
      <CardActions>
        <FlatButton label={'支持 '+agreeText} disabled={btn_disabled} onClick={this.agreeClick.bind(this, id)} />
        <FlatButton label={'反对 '+disagreeText} disabled={btn_disabled} onClick={this.disagreeClick.bind(this, id)} />
      </CardActions>
    );
  }
});

const AnswerTable = React.createClass({
  getInitialState: function(){
    return {
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
        let t_answer = [];
        let t_ansNum = 0;
        for (let obj in data.Data) {
          t_ansNum++;
          console.log(obj);
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
        }
        this.setState({
          answers: t_answer,
          ansNum: t_ansNum
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
        let t_bestAnswer = [];
        let t_bestAnsNum = 0;
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
        }
        this.setState({
          bestAnswers: t_bestAnswer,
          bestAnsNum: t_bestAnsNum
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
  answerList: function(answer) {
    let cardtitle = answer.author;
    let subtitle = answer.time;
    let agreeText = parseInt(answer.agree);
    let disagreeText = parseInt(answer.disagree);
    return (
      <Card key={answer.answerId}>
        <CardHeader style={styles.cardHeader} title={cardtitle} subtitle={subtitle} />
        <AnswerBtn
          id={answer.answerId}
          is_best={answer.is_best}
          agreeText={agreeText}
          disagreeText={disagreeText} />
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
