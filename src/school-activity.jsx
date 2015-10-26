'use strict'
require("../style/css/Activity.css");
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
      methods: 'get',
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
      setTimeout(function() {
        // add data
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          methods: 'get',
          success: function(data) {
            console.log(data);
            var t_message = this.state.messages;
            for (var obj in data.messagelist){
              console.log('loadQestionCard ' + obj);
              if(data.messagelist[obj] == null){
                // when no more questions, stop loading.
                this.setState({ hasMoreMessages:false });
                break;
              }
              t_message.push({
                'MsgID': data.messagelist[obj].MsgID,
                'Title': data.messagelist[obj].Title,
                'Time': data.messagelist[obj].Time,
                'ActiveTime': data.messagelist[obj].ActiveTime,
                'Auth': data.messagelist[obj].Auth
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
        });
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

var SchoolActivity= React.createClass({
  render: function(){
    let styles = {
      tabs:{
        overflowX:'scroll',
        width:'100%',
      },
      content: {
        left: '0',
        right: '0',
        position: 'absolute',
      },
      inkBar:{
        overflowX:'scroll',
        minWidth: '70px',
      },
      tab:{
        minWidth: '70px',
      }
    };
    return (
      <div>
        <AppBar />
        <div className='activity-tabs'>
        <Tabs 
        tabItemContainerStyle={styles.tabs} 
        contentContainerStyle={styles.content} 
        inkBarStyle={styles.inkBar}>
          <Tab style={styles.tab} label="全部" value='a'>
            <MessageTable url='messages'/>
          </Tab>
          <Tab style={styles.tab} label="专题活动" value='b'>
            <MessageTable url='messages'/>
          </Tab>
          <Tab style={styles.tab} label="社团活动" value='c'>
            <MessageTable url='messages'/>
          </Tab>
          <Tab style={styles.tab} label="招聘实习" value='d'>
            <MessageTable url='messages'/>
          </Tab>
          <Tab style={styles.tab} label="公益活动" value='e'>
            <MessageTable url='messages'/>
          </Tab>
          <Tab style={styles.tab} label="比赛活动" value='f'>
            <MessageTable url='messages'/>
          </Tab>
          <Tab style={styles.tab} label="讲座报告" value='g'>
            <MessageTable url='messages'/>
          </Tab>
          <Tab style={styles.tab} label="其它" value='h'>
            <MessageTable url='messages'/>
          </Tab>
        </Tabs>
        </div>
      </div>
    );
  }
});

module.exports = SchoolActivity;
