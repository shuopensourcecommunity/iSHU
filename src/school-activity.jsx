'use strict'
require("../style/css/Activity.css");
require("../style/css/Signup.css");
var React = require("react");
var { Card, CardTitle, CardText, CardActions, CircularProgress,
      Dialog, FlatButton, RaisedButton, Snackbar, Tabs, Tab, TextField } = require('material-ui');
var AppBar = require('./AppBar.jsx');
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// 校园活动详情
var ActivityDetail= React.createClass({
  getInitialState: function() {
    return {
      messageText:[],
      isJoined: false,
      showDialogActions: false,
      autoHideDuration: 5000,
      // snackbar hide duration, milliseconds
      mail: 'Hello!',
      phone: '123',
      text: 'dsf'
    };
  },
  loadMessageFromServer: function() {
    console.log('action_id:'+this.props.ActionID);
    var data = {
        action_id: this.props.ActionID
      };
    setTimeout(function() {
      $.ajax({
        url: 'getcampusactionbyid',
        dataType: 'json',
        method: 'post',
        data: data,
        success: function(data) {
          var t_messageText = [];
          t_messageText.push({
            'All': data.All,
            'ActiveTime': data.ActiveTime,
            'Title': data.Title,
            'Url': data.Url,
            'Address': data.Address,
            'Auth': data.Auth,
            'Mark': data.Mark,
            'Current': data.Current,
            'Summary': data.Summary,
            'ActionType': data.ActionType,
            'Url': data.Url,
            'Address': data.Address,
            'Time': data.Time,
            'EndTime': data.EndTime,
          });
          this.setState({messageText: t_messageText});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      },1000);
    }.bind(this), 1000);
  },

  componentDidMount: function(){
    this.loadMessageFromServer();
  },

  _handleSignUpClick: function(){
    console.log('will pop up a modal dialog');
    this.setState({showDialogActions: true});
  },
  _handleRequestClose: function(){
    this.setState({showDialogActions: false});
  },
  _handleDialogCancel: function(){
    this.setState({showDialogActions: false});
  },
  _handleDialogSubmit: function(){
    this.setState({showDialogActions: false});
    this.refs.success.show();
    var signUpData={
      'id': this.state.messageText[0].MsgID,
      'phone': this.state.phone,
      'mail': this.state.mail,
      'text': this.state.text,
      'cookie': this.state.messageText.cookie
    };
    console.log(signUpData);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
        this.setState({isJoined: true});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  _handleAction: function(event){
    this.refs.success.dismiss();
  },
  // handle TextField onChange
  phoneHandleChange: function(event) {
    this.setState({phone: event.target.value});
    console.log(this.state.phone);
  },
  mailHandleChange: function(event) {
    this.setState({mail: event.target.value});
  },
  textHandleChange: function(event) {
    this.setState({text: event.target.value});
  },

  render: function() {
    var ActivityDetail = this.state.messageText.map(function (detail){
      // customActions in Dialog
      let customActions = [
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={this._handleDialogCancel} />,
        <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this._handleDialogSubmit} />
      ];
      let styles = {
        main : {
          position: 'fixed'
          // position: 'absolute'
        },
        content : {
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }
      };
      var ActionType;
      if (detail.ActionType == '6') {ActionType='专题活动'}
      else if (detail.ActionType == '5') {ActionType='社团活动'} 
      else if (detail.ActionType == '4') {ActionType='招聘实习'}
      else if (detail.ActionType == '3') {ActionType='公益活动'}
      else if (detail.ActionType == '2') {ActionType='比赛活动'}
      else if (detail.ActionType == '1') {ActionType='讲座报告'}
      else {ActionType='其它'};
      return (
        <div>
          <div className="activity-detail">
            <div>
              <p className="inline activity-detail-title">活动名称：</p>
              <p className="inline activity-name">{detail.Title}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">活动类别：</p>
              <p className="inline activity-category">{ActionType}</p>
            </div>
            <div>
              <p className="activity-detail-title">活动简介：</p>
              <p className="activity-brief">{detail.Summary}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">报名开始时间：</p>
              <p className="inline activity-time-begin">{detail.Time}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">报名截止时间：</p>
              <p className="inline activity-time-end">{detail.EndTime}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">人数限制：</p>
              <p className="inline activity-number">{detail.Current}/{detail.All}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">报名状态：</p>
              <p className="inline activity-status">{detail.Status}</p>
            </div>
          </div>
          <RaisedButton label="我要报名" secondary={true} disabled={this.state.isJoined} onTouchTap={this._handleSignUpClick} />
          <Dialog
            ref="signup"
            title="我要报名"
            actions={customActions}

            open={this.state.showDialogActions}
            autoDetectWindowHeight={true}
            autoScrollBodyContent={true}
            onRequestClose={this._handleRequestClose}
            contentStyle={styles.content}
            style={styles.main}>
            <div className="index">
              <TextField className="text-field"
                floatingLabelText="手机：" type="phone" onChange={this.phoneHandleChange}/>
              <br />
              <TextField className="text-field"
                floatingLabelText="邮箱：" type="mail" onChange={this.mailHandleChange}/>
              <br />
              <TextField className="text-field"
                floatingLabelText="参加理由：" type="text" multiLine="true" onChange={this.textHandleChange}/>
              <br />
            </div>
          </Dialog>
          <Snackbar
            ref="success"
            message="报名成功"
            action="关闭"
            autoHideDuration={this.state.autoHideDuration}
            onActionTouchTap={this._handleAction}/>
        </div>
      )
    }.bind(this));
    return (
      <div>{ActivityDetail}</div>
    );
  }
});

// 校园活动列表
var ActivityTable= React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      keyword: 1,
      type: 203,
      limit: 10,
      current_page: 1,
      startTime: "10:01",
      endTime: "12:01",
      hasMoreMessages: true
      // if has more questions, continue loading.
    };
  },
  loadMessageFromServer: function(page) {
      console.log('loadMessageFromServer - page ' + this.state.current_page);
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
            console.log(data);
            var t_message = this.state.messages;
            for (var obj in data){
              console.log('loadQestionCard ' + obj);
              if(data[obj] == null){
                // when no more questions, stop loading.
                this.setState({ hasMoreMessages:false });
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
              current_page: this.state.current_page + 1,
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
          width: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        subtitle: {
          fontSize: 14,
          display: 'block',
        },
      };
      console.log('ActionID:'+message.ActionID);
      return (
        // Change titleColor/subtitleColor:
        // CardTitle props: subtitleColor={Colors.grey700}
        // or Styles.title: color: Colors.grey700,
        <Card initiallyExpanded={false}>
          <CardTitle
            titleStyle={styles.title}
            title={message.Title}
            subtitle={subtitle}
            actAsExpander={true}
            showExpandableButton={true}>
          </CardTitle>
          <CardText expandable={true}>
            <ActivityDetail url='messageText' ActionID={message.ActionID} />
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
      content: {
        left: '0',
        right: '0',
        position: 'absolute',
      },
      tab:{
        width: '560px',
      }
    };
    return (
      <div>
        <AppBar title="校园活动"/>
        <div className='activity-tabs'>
        <Tabs
        tabItemContainerStyle={styles.tab}
        contentContainerStyle={styles.content}>
          <Tab label="全部" value='a'>
            <ActivityTable url='getgampusactionlist'/>
          </Tab>
          <Tab label="专题活动" value='b'>
            <ActivityTable url='getzhuanti'/>
          </Tab>
          <Tab label="社团活动" value='c'>
            <ActivityTable url='getshetuan'/>
          </Tab>
          <Tab label="招聘实习" value='d'>
            <ActivityTable url='getzhaopin'/>
          </Tab>
          <Tab label="公益活动" value='e'>
            <ActivityTable url='getgongyi'/>
          </Tab>
          <Tab label="比赛活动" value='f'>
            <ActivityTable url='getbisai'/>
          </Tab>
          <Tab label="讲座报告" value='g'>
            <ActivityTable url='getjiangzuo'/>
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
