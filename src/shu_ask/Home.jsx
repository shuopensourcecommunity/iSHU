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
      categoryId: 0
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
		let categoryId = this.props.categoryId;
		let getAllCategories = {
			'page': this.state.curpage
		};
		let getThisCategory = {
			'cid': categoryId,
			'page': this.state.curpage
		};
		let getWrongId = {};
		let data = (categoryId==0) ? getAllCategories : ((categoryId>=1 && categoryId<=14) ? getThisCategory: getWrongId);
    $.ajax({
      url: 'getAskList',
      data: data,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
				console.log(data);
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
            'ansNumber': data.Data[obj].answer_number,
            'categoryId': data.Data[obj].category_id
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
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.categoryId != this.props.categoryId)
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
			let categoryId = question.categoryId;
			let categoryName = this.props.categoryName[categoryId];
      let subtitle='[ '+categoryName+' ] '
									+' 赏金: '+question.price
									+' 回答: '+question.ansNumber;
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
            <Card key={question.id}>
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

  getInitialState: function() {
    return {
      categories: [],
      categoryName: [],
      categoryId: (this.props.params.id==undefined) ? 0 : parseInt(this.props.params.id)
    };
  },

  loadCategoriesFromServer: function() {
    $.ajax({
      url: 'categories',
      dataType: 'json',
      methods: 'get',
      success: function(data) {
				console.log(data);
        let t_categories = [];
        let t_categoryName = [];
				t_categoryName.push('全部板块');
        for (let obj in data.Data){
          t_categoryName.push(data.Data[obj].Name);
          t_categories.push({
            'id': data.Data[obj].ID,
            'name': data.Data[obj].Name
          });
        }
        this.setState({
          categories: t_categories,
          categoryName: t_categoryName
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
    this.setState({categoryId: value});
  },

  render: function() {
    let styles={
      button: {
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'center'
      },
			iconStyle: {
				fill: '#CCC'
			},
			labelStyle: {
				color: '#666'
			},
			underline: {
				borderTop: 0
			}
    };
    let categoryToolbar =  (
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <FlatButton style={styles.button} linkButton={true} label="< iSHU" href={'/ishu'} secondary={true} />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} float="right">
              <DropDownMenu value={this.state.categoryId} onChange={this.handleChange} iconStyle={styles.iconStyle} labelStyle={styles.labelStyle} underlineStyle={styles.underline}>
								<MenuItem value={0} primaryText="全部板块" href={'/askbar/'} />
                {
									this.state.categories.map(category =>
                  	<MenuItem value={category.id} primaryText={category.name} href={'/askbar/#/category/'+category.id} />
                	)
								}
              </DropDownMenu>
              <FlatButton style={styles.button} linkButton={true} label="提问" href={'/askbar/#/question'} primary={true} />
          </ToolbarGroup>
        </Toolbar>
      );
    let categoryId = this.state.categoryId;
    let categoryName = this.state.categoryName;
    console.log(categoryId);
		console.log(categoryName);
    return (
      <div>
        <HeadBar title='乐乎问吧' />
        {categoryToolbar}
        <QuestionTable categoryId={categoryId} categoryName={categoryName}/>
      </div>
    );
  }
});

module.exports = Home;
