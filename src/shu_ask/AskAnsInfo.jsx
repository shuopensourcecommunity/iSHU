'use strict';
const HeadBar = require('./HeadBar.jsx');
const React =require('react');
const {Link, RouteHandler} = require('react-router');
const {Card, CardActions, CardText, CardTitle, FlatButton, RaisedButton,
  Toolbar, ToolbarGroup, ToolbarTitle} = require('material-ui');

const styles = {
  tbText: {
    paddingLeft: 16,
    fontSize: 15
  },
  cardTitle: {
    fontSize: 20
  },
  hide: {
    display: 'none'
  },
  show: {
    display: ''
  }
};

const QuestionContent = React.createClass({
  getInitialState: function() {
    return {
      id: 0,
      title: '',
      price: 0,
      content: '',
      answer_number: 0,
      category_id: 0
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
          id: data.Data.id,
          title: data.Data.title,
          price: data.Data.price,
          content: data.Data.content,
          answer_number: data.Data.answer_number,
          category_id: data.Data.category_id
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
          <RaisedButton linkButton={true} href={'askbar/#/answer/'+question.id} label="我要回答" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
    let QuestionContent = (
      <Card>
        <CardTitle title={question.title} titleStyle={styles.cardTitle} />
        <CardText>
          <div dangerouslySetInnerHTML={{__html:  question.content }} ></div>
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
      bestAnswers: [],
      bestAnsNum: 0,
      otherAnsNum: 0
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
        let t_bestAnsNum = 0;
        let t_otherAnsNum = 0;
        for (let obj in data.Data){
          // console.log(data.Data[obj].is_best);
          if (data.Data[obj].is_best) {
            t_bestAnsNum++;
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
            t_otherAnsNum++;
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
          this.state.isBest[id] = false;
          t_agree.push(false);
          t_disagree.push(false);
        }
        this.setState({
          answers: t_answer,
          bestAnswers: t_bestAnswer,
          bestAnsNum: t_bestAnsNum,
          otherAnsNum: t_otherAnsNum,
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
    // let cardtitle = answer.author+'  '+answer.time;
    let cardtitle = answer.time;
    return (
      <Card>
        <CardTitle subtitle={cardtitle} />
        <CardActions>
          <FlatButton label={'支持 '+agreeText} onClick={this.agreeClick.bind(this, id)} />
          <FlatButton label={'反对 '+disagreeText} onClick={this.disagreeClick.bind(this, id)} />
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
    let bestZero = (this.state.bestAnsNum==0);
    let ansZero = (this.state.otherAnsNum==0);
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
        <p style={bestZero&&ansZero?styles.show:styles.hide}>该问题暂无答案</p>
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
