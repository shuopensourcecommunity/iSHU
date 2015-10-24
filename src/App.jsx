'use strict'

let React = require('react');
let {render} = require('react-dom');
let AppBar = require('./AppBar.jsx');
let {CardMedia, CardTitle} = require('material-ui');

let HomeTable = React.createClass({
  render: function(){
    return (
      <div className="container">
        <table className="home-table">
          <tbody>
            <tr>
              <td>
                <img src="http://lorempixel.com/100/100/animals/"/>
                <p>校园资讯</p></td>
              <td><img src="http://lorempixel.com/100/100/food/"/>
              <p>校园活动</p></td>
            </tr>
            <tr>
              <td><img src="http://lorempixel.com/100/100/cats/"/>
              <p>校园查询</p></td>
              <td><img src="http://lorempixel.com/100/100/abstract/"/>
              <p>校园服务</p></td>
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
})

const App = React.createClass({
  render() {
    return (
      <div>
        <AppBar />
        <HomeTable />
      </div>
    )
  }
})

module.exports = App;
