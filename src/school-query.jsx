'use strict'
require("../style/css/main.css");
var React = require("react");
var cookie = require('react-cookie');
const Mui = require('material-ui');
const Tabs = Mui.Tabs;
const Tab = Mui.Tab;
const IconButton = Mui.IconButton;
const AppBar = require('./AppBar.jsx');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');

var QueryTabs = React.createClass({
  render: function(){
    return (
      <div>
        <Tabs>
          <Tab label="校车查询" value='a'>
            <div className="query-img">
              <img src='http://api.shu.edu.cn/Mobile/CampusFile/CampusBusSchedule' height="500px" />
            </div>
          </Tab>
          <Tab label="校园地图" value='b'>
            <div className="query-img">
              <img src='' height="500px" />
            </div>
          </Tab>
          <Tab label="校历查询" value='c'>
            <div className="query-img">
              <img src='http://api.shu.edu.cn/Mobile/CampusFile/CampusCalendarSpring' alt='spring' height="500px" />
            </div>
            <div className="query-img">
              <img src='http://api.shu.edu.cn/Mobile/CampusFile/CampusCalendarSummer' alt='summer' height="500px" />
            </div>

            <div className="query-img">
              <img src='http://api.shu.edu.cn/Mobile/CampusFile/CampusCalendarAutumn' alt='autum' height="500px" />
            </div>
            <div className="query-img">
              <img src='http://api.shu.edu.cn/Mobile/CampusFile/CampusCalendarWinter' alt='summer' height="500px" />
            </div>

          </Tab>
        </Tabs>
      </div>
    )
  }
})
var SchoolQuery = React.createClass({
  render: function(){
    return (
      <div>
       <AppBar title="校园查询"/>
       <QueryTabs />
      </div>
    );
  }
});

module.exports = SchoolQuery;
