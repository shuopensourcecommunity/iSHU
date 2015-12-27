'use strict'

require("../style/css/ishu/Home.css");
var React = require('react');
var cookie = require('react-cookie');
var AppBar = require('./AppBar.jsx');
const GridList = require('material-ui/lib/grid-list/grid-list');
const GridTile = require('material-ui/lib/grid-list/grid-tile');
let {Link, RouteHandler} = require('react-router');

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
  }
});

let HomeGrid = React.createClass({
  getInitialState: function() {
    return {
      homeData: [
        { title: "校园资讯", img: "/static/style/imgs/school-info.png", linkto: "/info" },
        { title: "校园活动", img: "/static/style/imgs/school-activity.png", linkto: "/activity" },
        { title: "校园查询", img: "/static/style/imgs/school-query.png", linkto: "/query" },
        { title: "校园服务", img: "/static/style/imgs/school-service.png", linkto: "/service" },
        { title: "乐乎问吧", img: "/static/style/imgs/lehu-ask.png", linkto: "/askbar"},
        { title: "学生事务", img: "/static/style/imgs/banshi-query.png", linkto: "/student"}
      ]
    };
  },
  render: function(){
    let styles = {
      Img: {
        height: '70%',
        transform: 'translateX(0%),translateY(50%)'
      }
    }
    return (
      <div className="home-grid center">
        {
          this.state.homeData.map(home => <Link to={home.linkto}>
            <div className="home-block">
              <img className="home-img" src={home.img} />
              <p className="home-title">{home.title}</p>
            </div>
          </Link>)
        }
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
