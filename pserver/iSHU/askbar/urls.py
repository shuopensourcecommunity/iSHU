#-*- encoding: utf-8 -*-
from django.conf.urls import include, url
from askbar.views import get_info
urlpatterns = [
	url(r'^(?P<section>Categories)/$', get_info, name ='Categories'),
	url(r'^(?P<section>AskList)/$', get_info, name = 'AskList'),
	url(r'^(?P<section>Question)/$', get_info, name = 'Question'),
]

