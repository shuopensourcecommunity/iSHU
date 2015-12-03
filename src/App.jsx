'use strict'

var React = require('react');
var cookie = require('react-cookie');
var AppBar = require('./AppBar.jsx');
require("../style/css/Home.css");
const GridList = require('material-ui/lib/grid-list/grid-list');
const GridTile = require('material-ui/lib/grid-list/grid-tile');
let {Link, RouteHandler} = require('react-router');

let HomeGrid = React.createClass({
  getInitialState: function() {
    return {
      homeData: [
        { title: "校园资讯", img: "/static/style/imgs/school-info.png", linkto: "/info" },
        { title: "校园活动", img: "/static/style/imgs/school-activity.png", linkto: "/activity" },
        { title: "校园查询", img: "/static/style/imgs/school-query.png", linkto: "/query" },
        { title: "校园服务", img: "/static/style/imgs/school-service.png", linkto: "/service" },
        { title: "乐乎问吧", img: "/static/style/imgs/lehu-ask.png" },
        { title: "办事指南", img: "/static/style/imgs/banshi-query.png" }
      ]
    };
  },
  render: function(){
    let styles = {
      Img: {
        height: '70%',
        transform: 'translateX(0%),translateY(50%)',
      }
    }
    return (
      <GridList
        className="home-grid center"
        cellHeight={200}
        cols={(screen.width>500)?3:2}
        style={{width: '100%', height:'90%', overflowY: 'auto'}}
        >
        {
          this.state.homeData.map(home => <GridTile
            rootClass={Link}
            to={home.linkto}
            title={home.title}
            titleBackground={'rgba(0, 0, 0, 0)'}
            ><div><img src={home.img} style={styles.Img} /></div></GridTile>)
        }
      </GridList>
    )
  }
});

const App = React.createClass({
  render() {
    return (
      <div>
        <AppBar title="上海大学" />
        <HomeGrid />
      </div>
    )
  }
});

module.exports = App;
