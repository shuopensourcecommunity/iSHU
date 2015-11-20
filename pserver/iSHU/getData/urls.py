from django.conf.urls import include, url
from views import get_campus_message_list,index
urlpatterns = [
    url("^index/",index),
    url("^schoolInfo/", get_campus_message_list)
]
