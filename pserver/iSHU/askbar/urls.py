# -*- encoding: utf-8 -*-
from django.conf.urls import url
from views import index, get_categories, get_ask_list, get_answer_by_question_id, \
    get_answer_detail_by_id

urlpatterns = [
    url(r'^$', index),
    url(r'^categories$', get_categories, name='get_categories'),
    url(r'^getAskList', get_ask_list, name='get_ask_list'),
    url(r'^getAnswerByQuestionId', get_answer_by_question_id, name='get_answer_by_questionId'),
    url(r'^getAnswerDetailById', get_answer_detail_by_id, name='get_answer_detail_by_id')
]
