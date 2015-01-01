#-*- encoding: utf-8 -*-
from django.conf.urls import include, url

from views import apply_for_campus_action
from views import index, user_login, get_msg_list, get_campus_action_by_id, get_campus_message_by_id,\
    get_jwc_message_by_id, get_xgb_message_by_id


urlpatterns = [
    url(r"^$",index),
    url(r"^user_login", user_login),

    # 校园咨询页面
    url(r"^get_msg/(?P<section>campus)/$", get_msg_list, name ='get_campus_msg_list'),
    url(r"^get_msg/(?P<section>xgb)/$", get_msg_list, name='get_xgb_msg_list'),
    url(r"^get_msg/(?P<section>jwc)/$", get_msg_list, name='get_jwc_msg_list'),

    url(r"^get_msg/(?P<section>action)/$", get_msg_list, name='get_action_msg_list'),  # 全部校园活动
    url(r'^get_msg/(?P<section>club_action)/$', get_msg_list,name='get_club_action_msg_list'),  # 社团活动
    url(r'^get_msg/(?P<section>special_action)/$', get_msg_list, name='get_special_action_msg_list'),  # 专题活动
    url(r'^get_msg/(?P<section>recruit_action)/$', get_msg_list, name='get_recruit_action_msg_list'),  # 招聘实习
    url(r'^get_msg/(?P<section>public_good_action)/$', get_msg_list, name='get_public_good_action_msg_list'),  # 公益活动
    url(r'^get_msg/(?P<section>competition_action)/$', get_msg_list, name='get_competition_action_msg_list'),  # 比赛活动
    url(r'^get_msg/(?P<section>lecture_action)/$', get_msg_list, name='get_lecture_action_msg_list'),  # 讲座报告
    #获取活动详细内容,传action_id
    url(r'^get_campus_action_by_id', get_campus_action_by_id, name='get_campus_action_by_id'),
    #报名,需要action_id,cookie,reasion,phone,mail
    url(r'^apply_for_campus_action', apply_for_campus_action, name='apply_for_campus_action'),

    url(r'^getCampusMessageById$', get_campus_message_by_id, name='get_campus_message_by_id'), # 获取校园信息详细
    url(r'^getJWCMessageById$', get_jwc_message_by_id, name='get_jwc_message_by_id'),
    url(r'^getXGBMessageById$', get_xgb_message_by_id, name='get_xgb_message_by_id')

]
