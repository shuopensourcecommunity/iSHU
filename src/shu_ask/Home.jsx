'use strict';
require('.../style/css/shu_ask/Home.css');
const React =require('react');
const {Link, RouteHandler} = require('react-router');
const HeadBar = require('./HeadBar.jsx');
const {List, ListDivider, ListItem} = require('material-ui');
const InfiniteScroll = require('react-infinite-scroll')(React);
// InfiniteScroll-Needed: npm install react-infinite-scroll
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const QuestionTable = React.createClass({
  getInitialState: function() {
    return {
      questions: [],
      currentPage: 1,
      hasMoreQuestions: true
      // if has more questions, continue loading.
    };
  },

  loadQuestionFromServer: function(page) {
    console.log('loadQuestionFromServer - page ' + this.state.currentPage);
    // fake an async. ajax call with setTimeout
    setTimeout(function() {
      // add data
      $.ajax({
        data: this.state.currentPage,
        url: this.props.url,
        dataType: 'json',
        methods: 'get',
        success: function(data) {
          let t_question = this.state.questions;
          for (let obj in data.data){
            //console.log('loadQestionCard ' + obj);
            if(data.data[obj] == null){
              // when no more questions, stop loading.
              this.setState({ hasMoreQuestions:false });
              break;
            }
            t_question.push({
              'name': obj,
              'url': data.data[obj].asker.link,
              'title': data.data[obj].title,
              'asker': data.data[obj].asker.name,
              'content': data.data[obj].content,
              'answers': data.data[obj].answerNumber,
              'price': data.data[obj].price,
              'sectorName': data.data[obj].sector.name,
              'sectorKey': data.data[obj].sector.key,
            });
          }
          this.setState({
            questions: t_question,
            currentPage: this.state.currentPage + 1,
            // current page is loaded, ready to load next page (currentPage+1)
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }.bind(this), 1000);
  },

  render: function() {
   /* 板块分类 sectorName sectorLink
    * 标题 question.title
    * 作者 question.asker
    * 内容 question.content
    * 回答数 question.answers
    * 赏金 question.price
    */
    let questionNodes = this.state.questions.map(function (question) {
      let link='/askAnsInfo/'+question.name;
      let sectorLink='/home/'+question.sectorKey;
      let sectorName='\> '+question.sectorName;
      return (
        <div>
          <Link to={link}>
            <ListItem
              primaryText={question.title}
              secondaryText={question.content}
              secondaryTextLines={2} />
          </Link>
          <ListDivider />
        </div>
      );
    });
    return (
      <div>
        <InfiniteScroll
          loadMore={this.loadQuestionFromServer}
          hasMore={this.state.hasMoreQuestions}
          loader={<p className="loader text-center">Loading ...</p>}>
          {questionNodes}
        </InfiniteScroll>
      </div>
    );
  }
});

const Home = React.createClass({
  render: function() {
    return (
      <div>
        <HeadBar url='categories' />
        <QuestionTable url ='questions' />
      </div>
    );
  }
});

module.exports = Home;
