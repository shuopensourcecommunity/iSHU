'use strict'
require("../style/css/Info.css");
var React = require("react");
var cookie = require('react-cookie');
let {Card, CardTitle, CardText, CardHeader, CardActions, CircularProgress, Tabs, Tab } = require('material-ui');
const AppBar = require('./AppBar.jsx');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);

var StudentService= React.createClass({
  getInitialState: function(){
    return {
      select: 1
    }
  },
  certificate: function() {
    this.setState({select: 1});
  },
  affairs: function() {
    this.setState({select: 2});
  },
  booking: function() {
    this.setState({select: 3});
  },
  render: function(){
    var select=this.state.select;
      let styles={
          title : {
              fontSize: 18,
              display: 'block',
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              width: '93%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
          },
          title2 : {
              fontSize: 18,
              lineHeight: '24px',
              width: '93%',
          },
          t: {
              fontSize: 18,
              display: 'block',
              lineHeight: '24px',
              whiteSpace: 'nowrap',
          }
      };
      var title_style = this.state.title_style? styles.title2:styles.title;
    return (
      <div>
        <AppBar title="学生事务"/>
        <Tabs>
          <Tab label="证明类" onActive={this.certificate}>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="在读证明"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      携带学生证或身份证至以下地点办理：
                      <br/>
                     <b>宝山校区: </b>A400学生服务中心4号窗口
                      <br/>
                      <b>延长校区: </b>行健楼
                      <br/>
                      <b>嘉定校区: </b>XX楼511

                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="居住证明"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      <br/>
                      <b>宝山校区: </b>A400学生服务中心15号窗口
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="成绩证明"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      <br/>
                      <b>宝山校区: </b>行政楼410教务处办理
                  </CardText>
              </Card>
          </Tab>
          <Tab label="事务类" onActive={this.affairs}>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title= "毕业生三方协议"
                      actAsExpander={true}
                      showExpandableButton={true}  onClick={this.cardOnClick}>
                  </CardTitle>
                  <CardText expandable={true} >
                     宝山校区：
                      网上填写电子协议书
                      前往A400学生服务中心5号窗口办理
                  </CardText>
              </Card>
          </Tab>
          <Tab label="场地预约" onActive={this.booking}>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title= "南区场地预约"
                      actAsExpander={true}
                      showExpandableButton={true}  onClick={this.cardOnClick}>
                  </CardTitle>
                  <CardText expandable={true} >
                     成就系统上预约
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title= "A400北区场地预约"
                      actAsExpander={true}
                      showExpandableButton={true}  onClick={this.cardOnClick}>
                  </CardTitle>
                  <CardText expandable={true} >
                     至学生服务中心官网下载打印场地预约表，填写好后需负责教师签字盖章，交至A400前台。
                  </CardText>
              </Card>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = StudentService;
