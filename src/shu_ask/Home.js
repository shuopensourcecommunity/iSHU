'use strict';
var HeadBar = require("./HeadBar.js");
require("../../style/css/shu_ask/Home.css");
var React = require('react');
let {Link, RouteHandler} = require('react-router');
var InfiniteScroll = require('react-infinite-scroll')(React);
// InfiniteScroll-Needed: npm install react-infinite-scroll
// loading page by page.

let QuestionTable = React.createClass({
  getInitialState: function() {
    return {
      questions: [],
      currentPage: 1,
      hasMoreQuestions: true,
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
            var t_question = this.state.questions;
            for (var obj in data.data){
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
     var questionNodes = this.state.questions.map(function (question) {
           var link="/askAnsInfo/"+question.name;
           var sectorLink="/home/"+question.sectorKey;
           var sectorName="\> "+question.sectorName;
           return (
             <div className="home-card" href="#">
               <Link  to={sectorLink}>
                 <h6 className="home-card-sector">
                   {sectorName}
                 </h6>
               </Link>
               <h4 className="home-page-header"><Link className="title-color" to={link}>{question.title}</Link>
                 <small><a href={question.url}>{question.asker}</a></small>
               </h4>
               <Link className="question-content" to={link}>{question.content}</Link>
               <div className="card-bottom">
                 <Link className="bottom-select-color" to={link}>回答数<span className="badge">{question.answers}</span></Link>
                 <a className="bottom-select-color">赏金<span className="badge">{question.price}</span></a>
               </div>
             </div>
           );
         });
     return (
       <div className="home-container container">
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
  render() {
    return (
      <div>
        <HeadBar url= 'categories' />
        <QuestionTable url = 'questions' />
      </div>
    );
  }
});

module.exports = Home;
