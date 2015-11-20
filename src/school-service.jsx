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
var {Link, RouteHandler} = require('react-router');
var ServiceCards = React.createClass({
  render: function(){
    return (
      <div>
        <Card>
          <Link to="/actlogin">
          <CardMedia className="service-img" overlay={<CardTitle title="成就系统" />}>
            <img src="./style/imgs/cj.png"/>
          </CardMedia>
          </Link>
        </Card>
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
        <AppBar title="校园服务"/>
        <ServiceCards />
      </div>
    )
  }
});

module.exports = SchoolService;
