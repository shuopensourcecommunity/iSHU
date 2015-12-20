'use strict';
var HeadBar = require("./HeadBar.js");
require("../../style/css/shu_ask/QuestionAnswer.css");
var React = require('react');
var {Link, RouteHandler} = require('react-router');

var QselectBtn = React.createClass({
	render: function(){
		return (
			<li className="col">
				<select className="btn btn-default dropdown-toggle dropup" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<option value="招生情况">招生情况</option>
				</select>
			</li>
		)
	}
})

var QrewardForm = React.createClass({
	render: function(){
		return (
			<li className="col">
				<div>悬赏额:
					<input className="price-input-box" type="text" placeholder="1～1000" />
				</div>
			</li>

		)
	}
})

var TextForm = React.createClass({
	render: function(){
		var placeholder=[];
		var selects=[];
		if (this.props.type === "question") {
			placeholder="问题描述";
		}
		else {
			placeholder="回答不超过300个汉字";
		}
		if (this.props.type == "question") {
			selects.push(
				<ul className="list-inline">
					<QselectBtn />
					<QrewardForm />
				</ul>
			);
		}
		return (
			<div>
				<form>
					<textarea className="textinput" type="text" placeholder={placeholder} ></textarea>
				</form>
				{selects}
			</div>
		);
	}
});

var BtnGroup = React.createClass({
	render: function(){
		return (
			<div>
				<button className="btn btn-lg btn-block btnn" type="button" >取消</button>
				<button className="btn btn-lg btn-primary btn-block btnn" type="submit" >确定</button>
			</div>
		);
	}
});

var Title = React.createClass({
	render:function(){
		var type = [];
		if (this.props.type === "question") {
			type.push(
				<h5 className="title">标题:
					<input className="titleinput" type="text" placeholder="问题标题" />
				</h5>
			);
		}
		else {
			type.push(
				<h5 className="title">标题: 
					{this.props.query}
				</h5>
			);
		}
		return (
			<div>
				{type}
			</div>
		)
	}
})

var Question = React.createClass({
	render: function(){
    	return (
      		<div>
        		<HeadBar url= 'categories' />
				<div className="container">
					<Title type="question"/>
					<TextForm type="question" />
					<BtnGroup />
				</div>
			</div>
		);
	}
});

var Answer = React.createClass({
	render: function(){
    	return (
      		<div>
        		<HeadBar url= 'categories' />
				<div className="container">
					<Title type="answer" query={this.props.query.title}/>
					<TextForm type="answer" />
					<BtnGroup />
				</div>
			</div>
		);
	}
});

module.exports = {
	Question: Question,Answer: Answer
}
