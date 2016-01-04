'use strict';
require('../../style/css/shu_ask/Home.css');
const React =require('react');
const HeadBar = require('./HeadBar.jsx');
const cookie = require('react-cookie');
const {Link, RouteHandler} = require('react-router');
const InfiniteScroll = require('react-infinite-scroll')(React);
const {HardwareKeyboardArrowLeft} = require('../../public/js/svg-icons');
const {Card, CardTitle, CardText, DropDownMenu, IconButton, IconMenu, MenuItem, FlatButton,
			Toolbar, ToolbarGroup, ToolbarTitle} = require('material-ui');
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const QuestionTable = React.createClass({
  getDefaultProps: function() {
    return {
      cid: 1
    }
  },

  getInitialState: function() {
    return {
      questions: [],
      curpage: 1,
      hasMoreQuestions: true
    };
  },

  loadQuestionFromServer: function() {
    console.log('page ' + this.state.curpage);
    // fake an async. ajax call with setTimeout
    setTimeout(function() {
      // add data
      $.ajax({
        url: 'getAskList',
        data: {
          'cid': this.props.cid,
          'page': this.state.curpage
        },
        dataType: 'json',
        methods: 'get',
        success: function(data) {
          let t_question = this.state.questions;
          for (let obj in data.Data){
            if(data.Data[obj] == null) {
              this.setState({ hasMoreQuestions: false });
              break;
            }
            t_question.push({
              'id': data.Data[obj].id,
              'title': data.Data[obj].title,
              'price': data.Data[obj].price,
              'content': data.Data[obj].content,
              'answer_number': data.Data[obj].answer_number,
              'category_id': data.Data[obj].category_id
            });
          }
          this.setState({
            questions: t_question,
            curpage: this.state.curpage + 1,
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }.bind(this), 10);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.cid != this.props.cid)
      this.setState({
        questions: [],
        curpage: 1,
        hasMoreQuestions: true
      });
  },

  cardOnClick: function() {
    this.setState({title_style: !this.state.title_style});
  },

  render: function() {
    let questionNodes = this.state.questions.map(function (question) {
      let link='/askAnsInfo/'+question.id;
      let subtitle='[ '+this.props.cname+' ] '
									+' 赏金: '+question.price
									+' 回答: '+question.answer_number;
      let styles={
        title : {
        fontSize: 18,
        display: 'block',
        lineHeight: '24px',
        whiteSpace: 'nowrap',
        width: '93%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        }
      };
      return (
          <Link to={link} className="link">
            <Card>
              <CardTitle
                titleStyle={styles.title}
                title={question.title}
                subtitle={subtitle} />
            </Card>
          </Link>
      );
    }.bind(this));
    return (
      <div>
        <InfiniteScroll
          loadMore={this.loadQuestionFromServer}
          hasMore={this.state.hasMoreQuestions}
          loader={<p className="loader text-center">Loading ...</p>}>
          {questionNodes}
        </InfiniteScroll>
      </div>
    );
  }
});

const Home = React.createClass({
  getDefaultProps: function() {
    return {
      url:'categories'
    };
  },

  getInitialState: function() {
    return {
      categories: [],
      cname: [],
      cid: (this.props.params.id==undefined) ? 1 : parseInt(this.props.params.id)
    };
  },

  loadCategoriesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        let t_categories = [];
        let t_cname = [];
        for (let obj in data.Data){
          t_cname.push(data.Data[obj].Name);
          t_categories.push({
            'id': data.Data[obj].ID,
            'name': data.Data[obj].Name
          });
        }
        this.setState({
          categories: t_categories,
          cname: t_cname
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadCategoriesFromServer();
  },

  handleChange: function(e, index, value) {
    this.setState({cid: value});
  },

  render: function() {
    // console.log(cookie.load('username'));
    let style={
      button: {
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'center'
      }
    };
    let categoryToolbar =  (
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <a href='/ishu'><IconButton tooltip="返回 iSHU"> <HardwareKeyboardArrowLeft /> </IconButton></a>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} float="right">
              <DropDownMenu value={this.state.cid} onChange={this.handleChange}>
                {this.state.categories.map(category =>
                  <MenuItem value={category.id} primaryText={category.name} href={'/askbar/#/category/'+category.id} />
                )}
              </DropDownMenu>
              <FlatButton style={style.button} linkButton={true} label="提问" href={'askbar/#/question'} primary={true} />
          </ToolbarGroup>
        </Toolbar>
      );
    let cid = this.state.cid;
    let cname = this.state.cname[cid-1];
    console.log(cid+cname);
    return (
      <div>
        <HeadBar title='乐乎问吧' />
        {categoryToolbar}
        <QuestionTable cid={cid} cname={cname}/>
      </div>
    );
  }
});

module.exports = Home;
