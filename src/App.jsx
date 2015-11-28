'use strict'
require("../style/css/Home.css");
let React = require('react');
let {render} = require('react-dom');
let AppBar = require('./AppBar.jsx');
var { GridList, GridTile } = require('material-ui');
var {Link, RouteHandler} = require('react-router');

let HomeGrid = React.createClass({
  getInitialState: function() {
    return {
      homeData: [
        { title: "校园资讯", img: "http://lorempixel.com/100/100/animals/", linkto: "/info" },
        { title: "校园活动", img: "http://lorempixel.com/100/100/food/", linkto: "/activity" },
        { title: "校园查询", img: "http://lorempixel.com/100/100/cats/", linkto: "/query" },
        { title: "校园服务", img: "http://lorempixel.com/100/100/animals/", linkto: "/service" },
        { title: "乐乎问吧", img: "http://lorempixel.com/100/100/nature/" },
        { title: "其他", img: "http://lorempixel.com/100/100/city/" }
      ]
    };
  },
  render: function(){
    return (
      <div className="home-content">
        <GridList
          className="home-grid center"
          cellHeight={200}
          style={{width: '100%', height: '100%', overflowY: 'auto'}}
          >
          {
            this.state.homeData.map(home => <GridTile
              rootClass={Link}
              to={home.linkto}
              title={home.title}
              titleBackground={'rgba(0, 0, 0, 0)'}
              style={{padding:0}}
              ><img src={home.img} /></GridTile>)
          }
        </GridList>
      </div>
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
