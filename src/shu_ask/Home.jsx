'use strict';
require('../../style/css/shu_ask/Home.css');
const React =require('react');
const HeadBar = require('./HeadBar.jsx');
const {Link, RouteHandler} = require('react-router');
const InfiniteScroll = require('react-infinite-scroll')(React);
const {List, ListDivider, ListItem} = require('material-ui');
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const QuestionTable = React.createClass({
  getDefaultProps: function() {
    return {
      url: 'getAskList'
    }
  },

  getInitialState: function() {
    return {
      questions: [],
      curpage: 1,
      hasMoreQuestions: true // if false, stop loading.
    };
  },

  loadQuestionFromServer: function(page) {
    console.log('loadQuestionFromServer - page ' + this.state.curpage);
    // fake an async. ajax call with setTimeout
    setTimeout(function() {
      // add data
      $.ajax({
        url: this.props.url,
        data: {
          'cid': 1,
          'page': this.state.curpage
        },
        dataType: 'json',
        methods: 'get',
        success: function(data) {
          // console.log(data);
          let t_question = this.state.questions;
          for (let obj in data.Data){
            // if no more data, set false to stop loading.
            if(data.Data[obj] == null) {
              this.setState({ hasMoreQuestions: false });
              break;
            }
            t_question.push({
              'id': data.Data[obj].id,
              'title': data.Data[obj].title,
              'price': data.Data[obj].price,
              'content': data.Data[obj].content,
              'answer_number': data.Data[obj].answer_number,
              'category_id': data.Data[obj].category_id
            });
          }
          // console.log(t_question);
          this.setState({
            questions: t_question,
            curpage: this.state.curpage + 1,
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }.bind(this), 10);
  },

  render: function() {
   /* ID   id
    * 板块  category_id
    * 标题  title
    * 内容  content
    * 回答  answer_number
    * 赏金  price
    */
    let questionNodes = this.state.questions.map(function (question) {
      let link='/askAnsInfo/'+question.id;
      // let sectorLink='/home/'+question.sectorKey;
      // let sectorName='\> '+question.sectorName;
      return (
        <div>
          <Link {...question} to={link}>
            <ListItem
              primaryText={question.title}
              secondaryText={question.content}
              secondaryTextLines={2} />
          </Link>
          <ListDivider />
        </div>
      );
    }.bind(this));
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
// TODO: headbar title change with categories
const Home = React.createClass({
  render: function() {
    return (
      <div>
        <HeadBar title='乐乎问吧' />
        <QuestionTable />
      </div>
    );
  }
});

module.exports = Home;
