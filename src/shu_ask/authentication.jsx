'use strict';

var cookie = require('react-cookie');
var AskbarAuth = function(){};
AskbarAuth.prototype.isLogin = function(){
    $.ajax({
        method: 'post',
        url: 'isLogin',
        data: {
            'user': {
                'guid': cookie.load('guid'),
                'username': cookie.load('username'),
                'user_id': cookie.load('user_id')
            }
        },
        dataType: 'json',
        success: function(data){
            return data.Status == 'success';
        },
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            return false;
        }.bind(this)
    })
};

module.export=AskbarAuth;