'use strict'
require("../style/css/main.css");
var React = require("react");
const Mui = require('material-ui');
const Card = Mui.Card;
const CardMedia = Mui.CardMedia;
const CardTitle = Mui.CardTitle;
const AppBar = require('./AppBar.jsx');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');
var ServiceCards = React.createClass({
  render: function(){
    return (
      <div>
        <Card><a href="http://cj.shu.edu.cn" >
          <CardMedia className="service-img" overlay={<CardTitle title="成就系统" />}>
            <img src="./style/imgs/cj.png"/>
          </CardMedia>
        </a></Card>
        <Card ><a href="http://202.120.127.129/Shulvms/Login.aspx" >
          <CardMedia className="service-img" overlay={<CardTitle title="志愿者报名" />}>
            <img src="./style/imgs/zy.png"/>
          </CardMedia>
        </a></Card>
      </div>
    )
  }
})
var SchoolService = React.createClass({
  render: function(){
    return (
      <div >
        <AppBar />
        <ServiceCards />
      </div>
    )
  }
});

module.exports = SchoolService;
