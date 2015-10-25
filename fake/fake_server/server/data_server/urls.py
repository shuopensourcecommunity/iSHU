__author__ = 'simon'

from django.conf.urls import url

from . import views

urlpatterns = [
  url(r'index', views.index, name='index'),
  url(r'messages', views.messages, name='messages'),
]
