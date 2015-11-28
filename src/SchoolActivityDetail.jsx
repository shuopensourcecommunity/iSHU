'use strict'
require("../style/css/Activity.css");
require("../style/css/Signup.css");
var React = require("react");
var { Card, CardTitle, CardText, CardActions, CircularProgress,
      Dialog, FlatButton, RaisedButton, Snackbar, Tabs, Tab, TextField } = require('material-ui');
var AppBar = require('./AppBar.jsx');
var SchoolDialog = require('./SchoolDialog.jsx');
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// 校园活动详情
var SchoolActivityDetail= React.createClass({
  getInitialState: function() {
    return {
      messageText:[],
      username: []
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
          console.log(t_messageText);
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
      var Summary=detail.Summary.replace("\r","\u000d");
      var Summary=Summary.replace("\n","\u000a");
      console.log(Summary);
      var string ='abczxaeib';
      string=string.replace("zx","\u000d\u000a");
      console.log(this.props.ActionID);
      return (
        <div>
          <div className="activity-detail">
            <div>
              <p className="inline activity-detail-title">活动名称：</p>
              <p className="inline activity-name">{detail.Title}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">活动类别：</p>
              <p className="inline activity-category" >{ActionType}</p>
            </div>
            <div>
              <p className="activity-detail-title">活动简介：</p>
              <div className="activity-brief">{Summary}</div>
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
          <SchoolDialog ActionID={this.props.ActionID} />
        </div>
      )
    }.bind(this));
    return (
      <div>{ActivityDetail}</div>
    );
  }
});

module.exports = SchoolActivityDetail;
