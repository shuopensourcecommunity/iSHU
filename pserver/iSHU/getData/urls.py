#-*- encoding: utf-8 -*-
from django.conf.urls import include, url

from views import applyforcampusaction
from views import index,user_login,getcampusactionbyid
from views import getzhaopin,getgongyi,getbisai,getjiangzuo
from views import getjwcmessagebyid,getcampusmessagebyid
from views import get_msg_list
urlpatterns = [
    url(r"^index/$",index),
    url(r"^index/user_login", user_login),

    # 校园咨询页面
    url(r"^index/get_msg/(?P<section>campus)/$", get_msg_list, name ='get_campus_msg_list'),
    url(r"^index/get_msg/(?P<section>xgb)/$", get_msg_list, name='get_xgb_msg_list'),
    url(r"^index/get_msg/(?P<section>jwc)/$", get_msg_list, name='get_jwc_msg_list'),
    #全部校园活动
    url(r"^index/get_msg/(?P<section>action)/$", get_msg_list, name='get_action_msg_list'),
    #社团活动
    url(r'^index/get_msg/(?P<section>club_action)/$', get_msg_list,name='get_club_action_msg_list'),
    #专题活动
    url(r'^index/get_msg/(?P<section>special_action)/$', get_msg_list, name='get_special_action_msg_list'),

    #招聘实习
    url(r'^index/getzhaopin', getzhaopin,name = 'getzhaopin'),
    #公益活动
    url(r'^index/getgongyi', getgongyi,name = 'getgongyi'),
    #比赛活动
    url(r'^index/getbisai', getbisai,name = 'getbisai'),
    #讲座报告
    url(r'^index/getjiangzuo',getjiangzuo,name = 'getjiangzuo'),
    #获取活动详细内容,传action_id
    url(r'^index/getcampusactionbyid',getcampusactionbyid,name = 'getcampusactionbyid'),
    #报名,需要action_id,cookie,reasion,phone,mail
    url(r'^index/applyforcampusaction',applyforcampusaction, name = 'applyforcampusaction'),
    #校园咨询
    url(r'^index/getcampusmessagebyid',getcampusmessagebyid,name = 'getcampusmessagebyid'),
    #jwc
    url(r'^index/getjwcmessagebyid',getjwcmessagebyid,name = 'getjwcmessagebyid'),
]
