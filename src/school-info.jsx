'use strict'
require("../style/css/ishu/Info.css");
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
      <InfiniteScroll
        loadMore={this.loadMessageFromServer}
        hasMore={this.state.hasMoreMessages}
        loader={<CircularProgress className="circular-progress" mode="indeterminate" size={0.8}/>}>
        <div className='activity-tabs'><div dangerouslySetInnerHTML={{__html: this.state.messageText}} /></div>
      </InfiniteScroll>
    );
  }
});

var InfoMessage = React.createClass({
  getInitialState: function() {
    return {
      title_style: false
    };
  },
  cardOnClick: function() {
    this.setState({title_style: !this.state.title_style});
  },
  render: function() {
    var message = this.props.message;
    var subtitle;
    (message.Auth == "None") ? subtitle="时间："+message.Time:subtitle="时间："+message.Time+" 发布来源："+message.Auth;
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
      <Card key={message.MsgID} initiallyExpanded={false}>
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
    )
  }
})

var InfoTable= React.createClass({
  getInitialState: function() {
    var url;
    if (this.props.url == 'get_msg/jwc/') {url='getJWCMessageById';}
    else if (this.props.url == 'get_msg/campus/') {url='getCampusMessageById';}
    else if (this.props.url == 'get_msg/xgb/') {url='getXGBMessageById';}
    return {
      messages: [],
      pagecount: 0,
      current_page: 1,
      hasMoreMessages: true,
      url: url,
      title_style: false
    };
  },
  loadMessageFromServer: function(page) {
      var data = {
        current_page: this.state.current_page
      };
      setTimeout(function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          method: 'post',
          data: data,
          success: function(data) {
            var t_message = this.state.messages;
            var t_pagecount = data.pagecount;
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
  render: function() {
    var messageNodes = this.state.messages.map(function (message) {
      return (
        <InfoMessage message={message} key={message.MsgID} />
      );
    }.bind(this));
    return (
      <InfiniteScroll
        loadMore={this.loadMessageFromServer}
        hasMore={this.props.active==this.props.url?this.state.hasMoreMessages:false}
        loader={<CircularProgress className="circular-progress" mode="indeterminate" size={0.8}/>}>
        {messageNodes}
      </InfiniteScroll>
    );
  }
});

var SchoolInfo= React.createClass({
  getInitialState: function() {
    return {
      infoData: [
        { title: "上大新闻", url: 'get_msg/campus/' },
        { title: "上大新闻", url: 'get_msg/xgb/' },
        // { title: "学生事务", url: 'get_msg/jwc/' }
      ]
    };
  },
  render: function(){
    var active = this.state.infoData[0].url;
    return (
      <div>
        <AppBar title="校园资讯"/>
        <Tabs>
        {
          this.state.infoData.map(data =>
            <Tab label={data.title} onTouchTap={active=data.url} key={data.title}>
              <InfoTable url={data.url} active={active}/>
            </Tab>
          )
        }
        </Tabs>
      </div>
    );
  }
});

module.exports = SchoolInfo;