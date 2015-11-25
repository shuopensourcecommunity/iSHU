from django.conf.urls import include, url

from views import getxgbmessagelist,getjwcmessagelist
from views import index,userlogin,postcampuscessagelist
urlpatterns = [
    url(r"^index/$",index),
    url(r"^userlogin",userlogin),
    url(r"^index/postcampuscessagelist",postcampuscessagelist,name='postcampuscessagelist'),
    url(r"^index/getxgbmessagelist",getxgbmessagelist,name='getxgbmessagelist'),
    url(r"^index/getjwcmessagelist",getjwcmessagelist,name='getjwcmessagelist')
]
