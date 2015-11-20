'use strict'
require("../style/css/main.css");
require("../style/css/ActLogin.css")
var React = require("react");
const Mui = require('material-ui');
const TextField = require('material-ui/lib/text-field');
const AppBar = require('./AppBar.jsx');
const FlatButton = require('material-ui/lib/flat-button');
const RaisedButton = require('material-ui/lib/raised-button');
const FloatingActionButton = require('material-ui/lib/floating-action-button');
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var {render} = require('react-dom');
var Login= React.createClass({
    render: function(){

        return (
            <div id = "actlogin">
                <TextField id = "id"
                    floatingLabelText="学 号" />
                <br></br>
                <TextField id="pwd"
                    floatingLabelText="密 码"
                    type = "password"/>
                <br></br>
                <div id="login_button">
                    <RaisedButton  label="登 陆" secondary={true} />
                </div>
            </div>

        )
    }
})
var ActLogin = React.createClass({
    render: function(){
        return (
            <div >
                <AppBar title="成就系统"/>
                <Login/>
            </div>
        )
    }
});

module.exports = ActLogin;
