'use strict'
require("../style/css/Query.css");
var React = require("react");
const Mui = require('material-ui');
const Tabs = Mui.Tabs;
const Tab = Mui.Tab;
const IconButton = Mui.IconButton;
const AppBar = require('./AppBar.jsx');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');
var SchoolQuery = React.createClass({
  render: function(){
    return (
      <div>
       <AppBar />
      <Tabs>
        <Tab label="校车查询" value='a'>
          <div className="query-img">
            <img src='./style/imgs/schoolbus.png' height="500px" />
          </div>
        </Tab>
        <Tab label="校园地图" value='b'>
          <div className="query-img">
            <img src='./style/imgs/map.jpg' height="500px" />
          </div>
        </Tab>
        <Tab label="校车查询" value='c'>
          <div className="query-img">
            <img src='./style/imgs/xl151.jpg' alt='xl1' height="500px" />
          </div>
          <div className="query-img">
            <img src='./style/imgs/xl152.jpg' alt='xl2' height="500px" />
          </div>
        </Tab>
      </Tabs>
      </div>

    );
  }
});

module.exports = SchoolQuery;
