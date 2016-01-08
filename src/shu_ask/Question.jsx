'use strict';
require('../../style/css/shu_ask/QuestionAnswer.css');
const HeadBar = require('./HeadBar.jsx');
const React = require('react');
const cookie = require('react-cookie');
const {FlatButton, SelectField, TextField} = require('material-ui');

const Question = React.createClass({
  getInitialState: function() {
    return {
      categories: [],
      title: '',
      content: '',
      cid: 1
    };
  },
  loadCategoriesFromServer: function() {
    $.ajax({
      url: 'categories',
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        // console.log(data);
        let t_categories = [];
        for (let obj in data.Data){
          t_categories.push({
            'id': data.Data[obj].ID,
            'name': data.Data[obj].Name
          });
        }
        this.setState({
          categories: t_categories
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCategoriesFromServer();
  },
  handleSelectValueChange: function(e, index, value){
    this.setState({cid: value});
  },
  handleTitleChange: function(event){
    this.setState({title: event.target.value});
  },
  handleContentChange: function(event){
    this.setState({content: event.target.value});
  },
  handleSubmitQuestion: function() {
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
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    // console.log(this.state.cid);
    let style = {
      textfield: {
        textAlign: 'left'
      },
      root: {
        fontSize: 13,
        width: '44%',
        marginLeft: '43%',
        marginBottom: 40
      }
    };
    let field = [
    // {<TextField style={style.root} hintText='1 ~ 1000' floatingLabelText='悬赏额' />}
      <SelectField
        style={style.root}
        labelStyle={style.label}
        value={this.state.cid}
        floatingLabelText='问题分类'
        onChange={this.handleSelectValueChange} >
        {
          this.state.categories.map(category =>
            <MenuItem value={category.id} primaryText={category.name} />
          )
        }
      </SelectField>
    ];
    return (
      <div>
        <HeadBar title='提问' />
        <center>
          <TextField
            onChange={this.handleTitleChange}
            floatingLabelText='提问标题' />
        </center>
        <center>
          <TextField
            style={style.textfield}
            multiLine={true}
            rows={8}
            onChange={this.handleContentChange}
            floatingLabelText='问题描述' />
        </center>
        {field}
         <div className='BtnGroup'>
           <FlatButton label='提交'
             className='button'
             keyboardFocused={true}
             primary={true}
             onTouchTap={this.handleSubmitQuestion} />
           <FlatButton label='取消'
             className='button'
             linkButton={true}
             href='/askbar/'
             secondary={true} />
         </div>
      </div>
    );
  }
});

module.exports = {
  Question: Question
};
