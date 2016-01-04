'use strict';
require('../../style/css/shu_ask/QuestionAnswer.css');
const HeadBar = require('./HeadBar.jsx');
const React = require('react');
const cookie = require('react-cookie');
const {Link, RouteHandler} = require('react-router');
const {FlatButton, SelectField, TextField, menuItems} = require('material-ui');

const Question = React.createClass({
  getInitialState: function() {
    return {
      values: [
        { payload: '1', text: '新生入学' },
        { payload: '2', text: '招生情况' },
        { payload: '3', text: '学习制度' },
        { payload: '4', text: '学生组织' }
      ],
    	title: '',
    	content: '',
    	cid: 0
    };
  },
  _handleSelectValueChange: function(event, values){
  	console.log(values.target.value);
    this.setState({cid: values.target.value});
  },
  _handleTitleChange: function(event){
    this.setState({title: event.target.value});
  },
  _handleContentChange: function(event){
    this.setState({content: event.target.value});
  },
  handleSubmitQuestion: function() {
  	console.log(cookie.load('guid'));
    let data = {
      'guid': cookie.load('guid'),
      'title': this.state.title,
      'content': this.state.content,
      'cid': this.state.cid
    };
    $.ajax({
      url: 'submitQuestion',
      dataType: 'json',
      method: 'post',
      data: data,
      success: function(data) {
        console.log(data);
        // var t_status = data.status;
        // this.setState({status: t_status,message: t_status});
        // if (t_status == "登录成功") {
        //   var t_realname = data.realname;
        //   this.setState({realname: t_realname});
        //   cookie.save('username', data.username);
        //   this.setState({logStatus: "登出"});
        // };
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var placeholder=[];
    var selects=[];
    var style = {
      root: {
        width: 100,
        fontSize: 13
      }
    };
    placeholder='问题描述';
    selects.push(
      <ul>
      	<TextField
        	style={style.root}
        	hintText='1 ~ 1000'
        	floatingLabelText='悬赏额' />
      	<SelectField
        	style={style.root}
        	value={this.state.cid}
        	hintText='问题分类'
        	valueMember='payload'
        	displayMember='text'
        	menuItems={this.state.values}
        	onChange={this._handleSelectValueChange.bind(null, 'values')} />
      </ul>
    );
    return (
      <div>
        <HeadBar title='提问' />
        <div className='q-and-a-container'>
        	<TextField
        		onChange={this._handleTitleChange}
        		floatingLabelText='提问标题' />
        	<TextField
          	multiLine={true}
          	rows={8}
        		onChange={this._handleContentChange}
          	floatingLabelText={placeholder} />
        	{selects}
      		<div className='BtnGroup'>
        		<FlatButton label='取消'
        			linkButton={true}
        			href='/askbar/'
        			secondary={true} />
        		<FlatButton label='提交'
        			keyboardFocused={true}
        			primary={true}
        			onTouchTap={this.handleSubmitQuestion} />
      		</div>
        </div>
      </div>
    );
  }
});

module.exports = {
  Question: Question
}
