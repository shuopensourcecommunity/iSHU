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
      messageText: '',
      hasMoreMessages: true
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
        this.setState({
          messageText: t_messageText,
          hasMoreMessages: false
        });
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
      <InfiniteScroll className='activity-tabs'
        loadMore={this.loadMessageFromServer}
        hasMore={this.state.hasMoreMessages}
        loader={<CircularProgress className="circular-progress" mode="indeterminate" size={0.8}/>}>
        <div dangerouslySetInnerHTML={{__html: this.state.messageText}} />
      </InfiniteScroll>
    );
  }
});

var MessageTable= React.createClass({
  getInitialState: function() {
    var url;
    if (this.props.url == 'get_msg/jwc/') {url='getjwcmessagebyid';}
    else if (this.props.url == 'get_msg/campus/') {url='getcampusmessagebyid';}
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
      url: url,
      title_style: false
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
                'url': this.state.url
              });
              t_pagecount = data.pagecount;
            }
            this.setState({
              messages: t_message,
              pagecount: t_pagecount,
              current_page: this.state.current_page + 1,
              // current page is loaded, ready to load next page (currentPage+1)
            });
            if (this.state.current_page >= this.state.pagecount) {this.setState({ hasMoreMessages:false });}

          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        },1000);
      }.bind(this), 1000);
  },
  cardOnClick: function() {
    this.setState({title_style: !this.state.title_style});
  },
  render: function() {
    var messageNodes = this.state.messages.map(function (message) {
      var subtitle;
      (message.Auth == "None") ? subtitle="时间："+message.Time:subtitle="时间："+message.Time+"     发布来源："+message.Auth;
      let styles={
        title : {
        fontSize: 18,
        display: 'block',
        lineHeight: '24px',
        whiteSpace: 'nowrap',
        width: '93%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        },
        title2 : {
          fontSize: 18,
          lineHeight: '24px',
          width: '93%',
        },
        t: {
          fontSize: 18,
          display: 'block',
          lineHeight: '24px',
          whiteSpace: 'nowrap',
        }
      };
      var title_style = this.state.title_style? styles.title2:styles.title;
      return (
        <Card initiallyExpanded={false}>
          <CardTitle
            titleStyle={title_style}
            title={message.Title}
            subtitle={subtitle}
            actAsExpander={true}
            showExpandableButton={true}  onClick={this.cardOnClick}>
          </CardTitle>
          <CardText expandable={true} >
            <MessageText url={message.url} MsgID={message.MsgID} />
          </CardText>
        </Card>
      );
    }.bind(this));
    return (
      <InfiniteScroll
        loadMore={this.loadMessageFromServer}
        hasMore={this.props.select=='1'?this.state.hasMoreMessages:false}
        loader={<CircularProgress className="circular-progress" mode="indeterminate" size={0.8}/>}>
        {messageNodes}
      </InfiniteScroll>
    );
  }
});

var SchoolInfo= React.createClass({
  getInitialState: function(){
    return {
      select: 1
    }
  },
  campuscessage: function() {
    this.setState({select: 1});
  },
  xgbmessage: function() {
    this.setState({select: 2});
  },
  jwcmessage: function() {
    this.setState({select: 3});
  },
  render: function(){
    var select=this.state.select;
    return (
      <div>
        <AppBar title="校园资讯"/>
        <Tabs>
          <Tab label="上大新闻" onActive={this.campuscessage}>
            <MessageTable url='get_msg/campus/' select={select=='1'?1:0}/>
          </Tab>
          <Tab label="学生事务" onActive={this.xgbmessage}>
            <MessageTable url='get_msg/xgb/' select={select=='2'?1:0}/>
          </Tab>
          <Tab label="教务信息" onActive={this.jwcmessage}>
            <MessageTable url='get_msg/jwc/' select={select=='3'?1:0}/>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = SchoolInfo;