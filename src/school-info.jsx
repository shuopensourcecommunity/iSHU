'use strict'
require("../style/css/Info.css");
var React = require("react");
var cookie = require('react-cookie');
let {Card, CardTitle, CardText, CardActions, CircularProgress, Tabs, Tab } = require('material-ui');
const AppBar = require('./AppBar.jsx');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);

var MessageText= React.createClass({
  getInitialState: function() {
    return {
      messageText: ''
    };
  },
  loadMessageFromServer: function() {
    var data={msg_id: this.props.MsgID};
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      method: 'post',
      data: data,
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
      <div dangerouslySetInnerHTML={{__html: this.state.messageText}} />
    );
  }
});

var MessageTable= React.createClass({
  getInitialState: function() {
    var url;
    if (this.props.url == 'getjwcmessagelist') {url='getjwcmessagebyid';}
    else if (this.props.url == 'postcampuscessagelist') {url='getcampusmessagebyid';};
    return {
      messages: [],
      pagecount: 0,
      keyword: 1,
      type: 203,
      limit: 10,
      current_page: 1,
      startTime: "10:01",
      endTime: "12:01",
      hasMoreMessages: true,
      url: {url}
    };
  },
  loadMessageFromServer: function(page) {
      // console.log('loadMessageFromServer - page ' + this.state.current_page);
      // fake an async. ajax call with setTimeout
      var data = {
        current_page: this.state.current_page
      };
      setTimeout(function() {
        // add data
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          method: 'post',
          data: data,
          success: function(data) {
            var t_message = this.state.messages;
            var t_pagecount = 0;
            for (var obj in data){
              if(data[obj].MsgID == undefined){
                // when no more questions, stop loading.
                if (obj < data.length-1) {this.setState({ hasMoreMessages:false });}
                break;
              }
              // console.log('loadQestionCard ' + obj);
              t_message.push({
                'MsgID': data[obj].MsgID,
                'Title': data[obj].Title,
                'Time': data[obj].Time,
                'ActiveTime': data[obj].ActiveTime,
                'Auth': data[obj].Auth,
                'url': this.state.url.url
              });
              t_pagecount = data.pagecount;
            }
            this.setState({
              messages: t_message,
              pagecount: t_pagecount,
              current_page: this.state.current_page + 1,
              // current page is loaded, ready to load next page (currentPage+1)
            });
            if (this.state.current_page >= this.state.pagecount) {this.setState({ hasMoreMessages:false });};
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        },1000);
      }.bind(this), 1000);
  },
  render: function() {
    var messageNodes = this.state.messages.map(function (message) {
      var subtitle;
      (message.Auth == "None") ? subtitle="时间："+message.Time:subtitle="时间："+message.Time+"     发布来源："+message.Auth;
      let styles={
        title: {
          fontSize: 18,
          display: 'block',
          lineHeight: '24px',
          whiteSpace: 'nowrap',
          width: '93%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        title2: {
          fontSize: 18,
          display: 'block',
          lineHeight: '24px',
          whiteSpace: 'nowrap',
          width: '93%',
        },
        t: {
          fontSize: 18,
          display: 'block',
          lineHeight: '24px',
          whiteSpace: 'nowrap',
        }
      };
      return (
        <Card initiallyExpanded={false}>
          <CardTitle
            titleStyle={Card.isExpanded?styles.title2:styles.title}
            title={message.Title}
            subtitle={subtitle}
            actAsExpander={true}
            showExpandableButton={true}>
          </CardTitle>
          <CardText expandable={true}>
            <MessageText url={message.url} MsgID={message.MsgID} />
          </CardText>
        </Card>
      );
    });
    return (
      <InfiniteScroll
        loadMore={this.loadMessageFromServer}
        hasMore={this.state.hasMoreMessages}
        loader={<CircularProgress className="circular-progress" mode="indeterminate" size={0.8}/>}>
        {messageNodes}
      </InfiniteScroll>
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
            <MessageTable url='getxgbmessagelist'/>
          </Tab>
          <Tab label="教务信息" value='c'>
            <MessageTable url='getjwcmessagelist'/>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = SchoolInfo;
