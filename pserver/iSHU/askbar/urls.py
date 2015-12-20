# -*- encoding: utf-8 -*-
from django.conf.urls import include, url
from views import get_categories

urlpatterns = [
    url(r'^(?P<section>Categories)/$', get_categories, name='get_categories'),
]
