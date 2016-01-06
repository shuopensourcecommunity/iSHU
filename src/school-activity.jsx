'use strict'
require("../style/css/ishu/Activity.css");
require("../style/css/ishu/Signup.css");
var React = require("react");
var cookie = require('react-cookie');
var { Card, CardTitle, CardText, CardActions, CircularProgress,
  Dialog, FlatButton, RaisedButton, Snackbar, Tabs, Tab, TextField } = require('material-ui');
var AppBar = require('./AppBar.jsx');
var ActivityDetail = require('./SchoolActivityDetail.jsx');
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var ActivityMessage = React.createClass({
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
    let subtitle=message.Auth+" "+"活动时间："+message.ActiveTime;
    let styles = {
      root: {
        padding: 16,
        position: 'relative'
      },
      title: {
        fontSize: 18,
        display: 'block',
        lineHeight: '24px',
        whiteSpace: 'nowrap',
        width: '93%',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      title2 : {
        fontSize: 18,
        lineHeight: '24px',
        width: '93%'
      },
      subtitle: {
        fontSize: 14,
        display: 'block'
      },
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
        <CardText expandable={true}>
          <ActivityDetail url='messageText' ActionID={message.ActionID}/>
        </CardText>
      </Card>
    )
  }
})
// 校园活动列表
var ActivityTable = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      pagecount: 0,
      current_page: 1,
      hasMoreMessages: true
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
            if(data[obj].ActionID == undefined){
              if (obj < data.length-1)  {this.setState({ hasMoreMessages:false });}
              break;
            }
            t_message.push({
              'ActionID': data[obj].ActionID,
              'Title': data[obj].Title,
              'Time': data[obj].Time,
              'ActiveTime': data[obj].ActiveTime,
              'EndTime': data[obj].EndTime,
              'Auth': data[obj].Auth,
              'Address': data[obj].Address,
            });
          }
          this.setState({
            messages: t_message,
            pagecount: t_pagecount,
            current_page: this.state.current_page + 1,
          });
          if (this.state.current_page >= this.state.pagecount) {this.setState({ hasMoreMessages:false });};
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }.bind(this), 1000);
  },
  render: function() {
    var messageNodes = this.state.messages.map(function (message) {
      return (
        <ActivityMessage message={message} key={message.ActionID} />
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

var SchoolActivity= React.createClass({
  getInitialState: function() {
    return {
      activityData: [
        { title: "全部", url: 'get_msg/action/' },
        { title: "专题活动", url: 'get_msg/special_action/' },
        { title: "社团活动", url: 'get_msg/club_action/' },
        { title: "招聘实习", url: 'get_msg/recruit_action/' },
        { title: "公益活动", url: 'get_msg/public_good_action/' },
        { title: "比赛活动", url: 'get_msg/competition_action/' },
        { title: "讲座报告", url: 'get_msg/lecture_action/' }
      ]
    };
  },
  render: function(){
    let styles = {
      content: {
        left: '0',
        right: '0',
        position: 'absolute'
      },
      tab:{
        width: (screen.width>'560')?'100%':'560px'
      }
    };
    var active = this.state.activityData[0].url;
    return (
      <div>
        <AppBar title="校园活动" zDepth={0} />
        <div className='activity-tabs'>
          <Tabs
            tabItemContainerStyle={styles.tab}
            contentContainerStyle={styles.content}>
          {
            this.state.activityData.map(data =>
              <Tab label={data.title} onTouchTap={active=data.url} key={data.title}>
                <ActivityTable url={data.url} active={active}/>
              </Tab>
            )
          }
          </Tabs>
        </div>
      </div>
    );
  }
});

module.exports = SchoolActivity;
