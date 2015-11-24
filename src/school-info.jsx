'use strict'
require("../style/css/Info.css");
var React = require("react");
let {Card, CardTitle, CardText, CardActions, CircularProgress, Tabs, Tab } = require('material-ui');
const AppBar = require('./AppBar.jsx');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);

var MessageText= React.createClass({
  getInitialState: function() {
    return {
      messageText: 'abc'
    };
  },
  loadMessageFromServer: function() {
    $.ajax({
      MsgID: this.props.MsgID,
      url: this.props.url,
      dataType: 'json',
      methods: 'post',
      success: function(data) {
        var t_messageText = [];
        t_messageText.push(data.Summary);
        this.setState({messageText: t_messageText});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.loadMessageFromServer();
  },
  render: function() {
    return (
      <div>
        {this.state.messageText}
      </div>
    );
  }
});

var MessageTable= React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      keyword: 1,
      type: 203,
      limit: 10,
      currentPage: 1,
      startTime: "10:01",
      endTime: "12:01",
      hasMoreMessages: true
      // if has more questions, continue loading.
    };
  },
  loadMessageFromServer: function(page) {
      console.log('loadMessageFromServer - page ' + this.state.currentPage);
      // fake an async. ajax call with setTimeout
      var data = {
        current_page: 1
      };
      setTimeout(function() {
        // add data
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          method: 'post',
          data: data,
          success: function(data) {
            console.log("xxxxxx" + data);
            var t_message = this.state.messages;
            for (var obj in data){
              console.log('loadQestionCard ' + obj);
              if(data[obj] == null){
                // when no more questions, stop loading.
                this.setState({ hasMoreMessages:false });
                break;
              }
              t_message.push({
                'MsgID': data[obj].MsgID,
                'Title': data[obj].Title,
                'Time': data[obj].Time,
                'ActiveTime': data[obj].ActiveTime,
                'Auth': data[obj].Auth
              });
            }
            this.setState({
              messages: t_message,
              currentPage: this.state.currentPage + 1,
              // current page is loaded, ready to load next page (currentPage+1)
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        },1000);
      }.bind(this), 1000);
  },
  render: function() {
    var messageNodes = this.state.messages.map(function (message) {
      var subtitle="时间："+message.Time+" 发布来源："+message.Auth;
      let styles={
        cardtitle: {
          fontSize: '17px',
          lineHeight: '25px'
        }
      };
      return (
        <Card initiallyExpanded={false}>
          <CardTitle
            titleStyle={styles.cardtitle}
            title={message.Title}
            subtitle={subtitle}
            actAsExpander={true}
            showExpandableButton={true}>
          </CardTitle>
          <CardText expandable={true}>
            <MessageText url='messageText' MsgID={message.MsgID} />
          </CardText>
        </Card>
      );
    });
    return (
      <div>
      <InfiniteScroll
        loadMore={this.loadMessageFromServer}
        hasMore={this.state.hasMoreMessages}
        loader={<CircularProgress className="circular-progress" mode="indeterminate" />}>
        {messageNodes}
      </InfiniteScroll>
      </div>
    );
  }
});

var SchoolInfo= React.createClass({
  render: function(){
    return (
      <div>
        <AppBar title="校园资讯"/>
        <Tabs>
          <Tab label="上大新闻" value='a'>
            <MessageTable url='postcampuscessagelist'/>
          </Tab>
          <Tab label="学生事务" value='b'>
            <MessageTable url=''/>
          </Tab>
          <Tab label="教务信息" value='c'>
            <MessageTable url=''/>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = SchoolInfo;
