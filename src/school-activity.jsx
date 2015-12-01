'use strict'
require("../style/css/Activity.css");
require("../style/css/Signup.css");
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

// 校园活动列表
var ActivityTable= React.createClass({
  getInitialState: function() {
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
      title_style: false
    };
  },
  loadMessageFromServer: function(page) {
      // console.log('loadMessageFromServer - page ' + this.state.current_page);
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
            // console.log(data);
            var t_message = this.state.messages;
            var t_pagecount = 0;
            for (var obj in data){
              // console.log('loadQestionCard ' + obj);
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
        });
      }.bind(this), 1000);
  },
  cardOnClick: function() {
    this.setState({title_style: !this.state.title_style});
  },
  render: function() {
    var messageNodes = this.state.messages.map(function (message) {
      let subtitle=message.Auth+" "
                  +"活动时间："+message.ActiveTime;
      let styles = {
        root: {
          padding: 16,
          position: 'relative',
        },
        title: {
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
        subtitle: {
          fontSize: 14,
          display: 'block',
        },
      };
      var title_style = this.state.title_style? styles.title2:styles.title;
      return (
        // Change titleColor/subtitleColor:
        // CardTitle props: subtitleColor={Colors.grey700}
        // or Styles.title: color: Colors.grey700,
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

var SchoolActivity= React.createClass({
  getInitialState: function(){
    return {
      select: 1
    }
  },
  campuscessage: function() {
    this.setState({select: 1});
  },
  zhuanti: function() {
    this.setState({select: 2});
  },
  shetuan: function() {
    this.setState({select: 3});
  },
  zhaopin: function() {
    this.setState({select: 4});
  },
  gongyi: function() {
    this.setState({select: 5});
  },
  bisai: function() {
    this.setState({select: 6});
  },
  jiangzuo: function() {
    this.setState({select: 7});
  },
  render: function(){
    let styles = {
      content: {
        left: '0',
        right: '0',
        position: 'absolute',
      },
      tab:{
        width: (screen.width>'560')?'100%':'560px'
      }
    };
    var select=this.state.select;
    return (
      <div>
        <AppBar title="校园活动"/>
        <div className='activity-tabs'>
          <Tabs
            tabItemContainerStyle={styles.tab}
            contentContainerStyle={styles.content}>
            <Tab label="全部" onActive={this.campuscessage}>
              <ActivityTable url='getgampusactionlist' select={select=='1'?1:0}/>
            </Tab>
            <Tab label="专题活动" onActive={this.zhuanti}>
              <ActivityTable url='getzhuanti' select={select=='2'?1:0}/>
            </Tab>
            <Tab label="社团活动" onActive={this.shetuan}>
              <ActivityTable url='getshetuan' select={select=='3'?1:0}/>
            </Tab>
            <Tab label="招聘实习" onActive={this.zhaopin}>
              <ActivityTable url='getzhaopin' select={select=='4'?1:0}/>
            </Tab>
            <Tab label="公益活动" onActive={this.gongyi}>
              <ActivityTable url='getgongyi' select={select=='5'?1:0}/>
            </Tab>
            <Tab label="比赛活动" onActive={this.bisai}>
              <ActivityTable url='getbisai' select={select=='6'?1:0}/>
            </Tab>
            <Tab label="讲座报告" onActive={this.jiangzuo}>
              <ActivityTable url='getjiangzuo' select={select=='7'?1:0}/>
            </Tab>
            {/*<Tab label="其它" value='h'>
                    <ActivityTable url='messages'/>
                    </Tab>*/}
          </Tabs>
        </div>
      </div>
    );
  }
});

module.exports = SchoolActivity;
