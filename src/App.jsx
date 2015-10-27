'use strict'

let React = require('react');
let {render} = require('react-dom');
let AppBar = require('./AppBar.jsx');
var {Link, RouteHandler} = require('react-router');

let HomeTable = React.createClass({
  render: function(){
    let link2info = "/info";
    let link2activity = "/activity";
    let link2query = "/query";
    let link2service = "/service";
    //let link2ask = "";
    return (
      <div>
        <table className="home-table">
          <tbody>
            <tr>
              <td>
                <Link to={link2info}>
                  <img src="http://lorempixel.com/100/100/animals/"/>
                  <p>校园资讯</p>
              </Link>
            </td>
              <td>
                <Link to={link2activity}>
                  <img src="http://lorempixel.com/100/100/food/"/>
                  <p>校园活动</p>
              </Link>
            </td>
            </tr>
            <tr>
              <td>
                <Link to={link2query}>
                  <img src="http://lorempixel.com/100/100/cats/"/>
                  <p>校园查询</p>
                </Link>
              </td>
              <td>
                <Link to={link2service}>
                  <img src="http://lorempixel.com/100/100/abstract/"/>
                  <p>校园服务</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td><img src="http://lorempixel.com/100/100/nature/"/>
              <p>乐乎问吧</p></td>
              <td><img src="http://lorempixel.com/100/100/city/"/>
              <p>其他</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
});

const App = React.createClass({
  render() {
    return (
      <div>
        <AppBar title="上海大学" />
        <HomeTable />
      </div>
    )
  }
});

module.exports = App;
