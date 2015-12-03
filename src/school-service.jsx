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
  getInitialState: function() {
    return {
      data: [
        { title: "社团报名",
          img: "/static/style/imgs/community-signup.png",
          linkto: "http://www.campus.shu.edu.cn"
        },
        {
          title: "志愿者报名",
          img: "/static/style/imgs/volunteer-signup.png",
          linkto: "http://202.120.127.129/Shulvms/Login.aspx"
        },
        {
          title: "晨跑查询",
          img: "/static/style/imgs/run-query.png",
          linkto: "http://card.lehu.shu.edu.cn/CardTrainingDetail.aspx"
        },
        {
          title: "一卡通挂失",
          img: "/static/style/imgs/card-loss.png",
          linkto: "http://card.lehu.shu.edu.cn/CardLostDetail.aspx"
        }
      ]
    };
  },
  render: function(){
    let styles = {
      Img: {
        height: '68%',
        transform: 'translateX(0%),translateY(50%)',
      },
    }
    return (
      <div className="service-grid center">
        {
          this.state.data.map(home => <a href={home.linkto}>
            <div className="service-block">
              <img className="service-img" src={home.img} />
              <p className="service-title">{home.title}</p>
            </div>
          </a>)
        }
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
