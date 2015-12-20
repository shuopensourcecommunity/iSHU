'use strict';

require('jquery');
require("../../style/css/shu_ask/HeadBar.css");
var React =require('react');
var {Link, RouteHandler} = require('react-router');

var HeadBar = React.createClass({
	getInitialState: function(){
		return {
			sectors: []
		};
	},
  loadSectorFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      methods: 'get',
      success: function(data) {
        var t_sector = [];
        for (var obj in data.data){
					console.log(data.data[obj]);
          t_sector.push({
            'name': data.data[obj].name,
            'key': data.data[obj].key
          });
        }
        this.setState(
          {
            sectors: t_sector
          }
        );
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

	componentDidMount: function(){
		this.loadSectorFromServer();
	},

	render: function(){
		var sectorNodes = this.state.sectors.map(function (sector) {
            var string="/home/"+sector.key;
			return (
				 <ul className="dropdown-menu">
				 	<li value= {sector.name}><Link to={string}>{sector.name}</Link></li>
				 </ul>
				);
		});

		return (
				<div>
					<nav className="navbar navbar-default navbar-fixed-top">
						<div className="container-fluid">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
                                <Link className="navbar-brand" to="/home">LEHU ASK </Link>
								<button type="button" className="btn navbar-btn toggle-search" data-toggle="collapse" data-target="#navbar-search" aria-expanded="false">
									<img src="/static/style/imgs/ic_search_black_24dp.png" width="20px" height="20px"/>
								</button>
							</div>

						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li className="active"><Link to="/Question">我要提问 <span className="sr-only">(current)</span></Link></li>
								<li className="dropdown">
									<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">全部板块<span className="caret"></span></a>
										{sectorNodes}
								</li>
							</ul>
							<ul className="nav navbar-nav navbar-right navbar-profile-status">
								<li><Link to="/Login"> 登出</Link></li>
							</ul>
						</div>
						<div className="collapse" id="navbar-search">
							<form className="navbar-form" role="search">
								<div className="input-group form-search">
									<input type="text" className="form-control" placeholder="Search"/>
									<span className="input-group-btn">
										<button type="submit" className="btn btn-default">搜索</button>
									</span>
								</div>
							</form>
						</div>
					</div>
				</nav>
			</div>
			);
	}
});

module.exports = HeadBar;
