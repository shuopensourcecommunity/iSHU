'use strict'
require("../style/css/main.css");
var React = require("react");
const Mui = require('material-ui');
const GridList = Mui.GridList;
const GridTile = Mui.GridTile;
const IconButton = Mui.IconButton;
const StarBorder = Mui.StarBorder;
const AppBar = require('./AppBar.jsx');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');
var {Link, RouteHandler} = require('react-router');
var ServiceCards = React.createClass({
  render: function(){
    return (
      <GridList
        cols={2}
        cellHeight={265}
        style={{width: '100%', overflowY: 'auto'}}
      >
        <GridTile
          title='社团'
        ><a href='http://www.campus.shu.edu.cn'><img src='/static/style/imgs/1.png' /></a></GridTile>
        <GridTile
          title='志愿者报名'
        ><a href="http://202.120.127.129/Shulvms/Login.aspx"><img src='/static/style/imgs/2.png'  /></a></GridTile>
        <GridTile
          title='晨跑／一卡通挂失'
        ><a href="http://card.lehu.shu.edu.cn"><img src='/static/style/imgs/3.jpg'  /></a></GridTile>
        <GridTile
          title='一卡通管理'
        ><a href="http://card.lehu.shu.edu.cn"><img src='/static/style/imgs/4.png'  /></a></GridTile>
      </GridList>
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
