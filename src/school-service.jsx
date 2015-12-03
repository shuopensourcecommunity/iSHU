'use strict'
require("../style/css/main.css");
var React = require("react");
var cookie = require('react-cookie');
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
    let styles = {
      Img: {
        height: '68%',
        transform: 'translateX(0%),translateY(50%)',
      },
    }
    return (
      <GridList
        className="home-grid center"
        cols={2}
        cellHeight={265}
        style={{width: '100%', overflowY: 'auto'}}
      >
        <GridTile
          rootClass={'a'}
          href='http://www.campus.shu.edu.cn'
          title='社团'
        ><div><img src='/static/style/imgs/community-signup.png' style={styles.Img} /></div></GridTile>
        <GridTile
          rootClass={'a'}
          title='志愿者报名'
          href="http://202.120.127.129/Shulvms/Login.aspx"
        ><div><img src='/static/style/imgs/volunteer-signup.png' style={styles.Img} /></div></GridTile>
        <GridTile
          rootClass={'a'}
          href="http://card.lehu.shu.edu.cn/CardTrainingDetail.aspx"
          title='晨跑'
        ><div><img src='/static/style/imgs/run-query.png' style={styles.Img} /></div></GridTile>
        <GridTile
          rootClass={'a'}
          href="http://card.lehu.shu.edu.cn/CardLostDetail.aspx"
          title='一卡通挂失'
        ><div><img src='/static/style/imgs/card-loss.png' style={styles.Img} /></div></GridTile>
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
