'use strict'
require("../style/css/ishu/main.css");

var _ = require('underscore');
var sprintf = require('sprintf');
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
var CanvasZoomify = require("../public/js/CanvasZoomify.min.js");

var SchoolMapZoom = React.createClass({
  componentDidMount: function(){
    var levelValues = [1,2,4,8];
    var rowsPerLevel = 4;
    var colsPerLevel = 2;
    var tilesPath = function() {
      var basePath = '/static/style/imgs/SchoolMap';
      return _.map(levelValues, function(levelV) {
        return _.map(_.range(0, rowsPerLevel*levelV), function(row) {
          return _.map(_.range(0, colsPerLevel*levelV), function(col) {
            return sprintf("%s/%d/SchoolMap-%d-%d-%d.jpg", basePath, levelV, levelV, row, col);
          });
        });
      });
    }();

    var cz = new CanvasZoomify(
      $('.canvaszoomify'),
      {
        tiles: tilesPath,
        levelValues: levelValues,
        rowsPerLevel: rowsPerLevel,
        colsPerLevel: colsPerLevel,
        isDebug: true,
      },
      {
        isDebug: true,
        width: 640,
        height: 480,
        offsetX: 0,
        offsetY: 0,
        scale: 1.0,
        scaleStep: 1.1,
        scaleMax: 16.0,

        afterInit: function()    { console.log('init!'); },

        onUpdate: function(event)  { console.log('update!'); },
        onClear: function(event)   { console.log('clear!'); },
        onRepaint: function(event) { console.log('repaint!'); },

        onPanstart: function(ev) {},
        onPanmove: function(ev) {},
        onPinchstart: function(ev) {},
        onPinch: function(ev) {},
      });

    },
  render: function(){
    return (
        <div className="canvaszoomify"></div>
    )
  }
});

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
            <SchoolMapZoom></SchoolMapZoom>

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
