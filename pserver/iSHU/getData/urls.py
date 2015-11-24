from django.conf.urls import include, url

from views import get_campus_message_list,index,userlogin,campuscalendarspring,getcampuscessagelist
urlpatterns = [
    url(r"^index/$",index),
    url(r"^schoolInfo/", get_campus_message_list),
    url(r"^userlogin/",userlogin),
    url(r"^campuscalendarspring",campuscalendarspring),
    url(r"^index/getcampusmessagelist",getcampuscessagelist)
]
