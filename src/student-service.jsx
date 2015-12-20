'use strict'
require("../style/css/ishu/Info.css");
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
                      携带本人学生证或身份证至以下地点办理：
                      <br/>
                      <br/>
                      <b>宝山校区: </b><br/>
                      A400学生服务中心4号窗口    窗口电话: 021-66131828
                      <br/>
                      学生助理有课不在时，办理在读证明请前往A408
                      <br/>
                      <b>延长校区: </b>行健楼
                      <br/>
                      <b>嘉定校区: </b>XX楼511
                      <br />
                      <br/>
                      注意：学生在读证明不予代开,若有特殊情况，本人不能到校，请代为开具的同学持至少两种申请人的身份证明(如学生证，学生证副卡，身份证等)
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
                      请前往校本部A400学生服务中心15号窗口办理：<br/>
                      请同学先前往武保处网站下载相关表格，填写完成后在15号窗口进行信息审核与盖章<br/>
                      窗口电话：021-66135339
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
                      在校本科生成绩大表，成绩排名证明，请前往校本部A400学生服务中心11号窗口办理<br/>
                      窗口电话: 021-66135319 <br/>
                      注意：老师若另有工作安排，有事或盖章可直接到行政楼401找相关老师办理，也可拨打66132131电话进行咨询
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="创新项目立项，结题证明"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>

                      请前往校本部A400学生服务中心11号窗口办理<br/>
                      窗口电话: 021-66135319 <br/>
                      注意：老师若另有工作安排，有事或盖章可直接到行政楼401找相关老师办理，也可拨打66132131电话进行咨询
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="婚育证明"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                     请前往校本部A400学生服务中心1-3号窗口办理：<br/>
                      办理时请先到窗口对面的电脑上填写相关信息(党组织关系登记表.xls),再到窗口办理党组织关系转移 <br/>
                      窗口电话: 021-66135259
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="户籍证明"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      集体户口学生，因私需公安机关出具《户籍证明》，由本人填写申请表（须在申请表中填写事由和用途，如申办护照、出国签证、边境出入证、就业、结婚、公证等），请辅导员老师或导师签名认可并加盖学院公章，同时需开具在读证明，后持本人身份证、申请表、在读证明，在保卫处“窗口”申领《户籍证明》介绍信，最后携带本人身份证、保卫处出具的《户籍证明》介绍信和在读证明，到集体户口管辖地区公安派出所办理《户籍证明》。申请表可在武保处网站服务指南板块里下载也可在武保处领取。
                      <br />
                      <b>宝山校区</b>：集体户口管辖地区公安派出所：祁连派出所（锦秋路1281号）
                      <br />
                      <b>嘉定校区</b>：集体户口管辖地区公安派出所：嘉城派出所（塔城路555号）。
                      <br />
                      <b>延长校区</b>：集体户口管辖地区公安派出所：大宁派出所（彭江路200号）。还需携带身份证复印件。
                      <br />
                      保卫处咨询电话：
                      <br />
                      <b>宝山校区</b>：66132610，66134278
                      <br />
                      <b>嘉定校区</b>：69982395，69982400
                      <br />
                      <b>延长校区</b>：56331897
                      <br />
                      网址http://www.wubaochu.shu.edu.cn/Default.aspx
                      <br />
                  </CardText>
              </Card>
          </Tab>
          <Tab label="事务类" onActive={this.affairs}>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title= "毕业生协议书鉴定"
                      actAsExpander={true}
                      showExpandableButton={true}  onClick={this.cardOnClick}>
                  </CardTitle>
                  <CardText expandable={true} >
                      前往校本部A400学生服务中心5号窗口办理：<br/>
                      请先在网上填写电子协议书 <br/>
                      电子协议书输入流程:<br/>
                          (1) 进入上海大学就业网 <br/>
                          (2) 使用一卡通帐号密码登录 <br/>
                          (3) 管理中心->就业管理->填写毕业生去向 <br/>
                          (4) 生源地就业主管部门必须填写，有列表可查询(上海籍学生除外) <br/>
                          (5) 电子版提交完成后，将由工作人员鉴证 <br/>
                      窗口电话：021-66135238
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="成绩单补办"
                      actAsExpander={true}
                      showExpandableButton={true}  onClick={this.cardOnClick}>
                  </CardTitle>
                  <CardText expandable={true} >
                      全国大学生英语四、六级考试成绩单遗失申请补办 <br/>
                      上海市高校计算机等级考试成绩单遗失申请补办 <br/>
                      国家普通话水平测试证书遗失补办 <br/>
                      国家汉字应用水平测试成绩单补办 <br/>
                      以上成绩单遗失补办请前往校本部A400学生服务中心11号窗口办理: <br/>
                      窗口电话: 021-66135319 <br/>
                      注意：老师若另有工作安排，有事或盖章可直接到行政楼401找相关老师办理，也可拨打66132131电话进行咨询
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="团组织关系转接"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      <br/>
                      前往校本部A400学生服务中心16号窗口办理<br/>
                      窗口电话: 021-66131396 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="困难生认定"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="绿色通道"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="国家助学贷款"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="助学金"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="临时困难补助"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="慈善爱心屋"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="勤工助学"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="素质拓展训练营"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>
                  </CardText>
              </Card>
          </Tab>
          <Tab label="场地租借" onActive={this.booking}>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title= "南区场地预约"
                      actAsExpander={true}
                      showExpandableButton={true}  onClick={this.cardOnClick}>
                  </CardTitle>
                  <CardText expandable={true} >
                     请前往成就系统上预约
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
                      至学生服务中心官网下载打印场地预约表，填写好后经负责教师签字盖章，交至A400前台。<br/>
                      前台电话:021-66131186<br/>
                      可打电话或直接前往A400前台进行预约
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="校内活动场地审批"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                      前往校本部A400学生服务中心16号窗口办理<br/>
                      窗口电话: 021-66131396 <br/>
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="伟长楼"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>

                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="图书馆研习空间"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                    至相关网站预约，需至少四名同学学号
                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="图书馆报名厅"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>

                  </CardText>
              </Card>
              <Card initiallyExpanded={false}>
                  <CardTitle
                      titleStyle={title_style}
                      title="社区学院二楼"
                      actAsExpander={true}
                      showExpandableButton={true}>
                  </CardTitle>
                  <CardText expandable={true}>
                  </CardText>
              </Card>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = StudentService;
