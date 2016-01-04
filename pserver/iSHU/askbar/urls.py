# -*- encoding: utf-8 -*-
from django.conf.urls import url
from views import *

urlpatterns = [
    url(r'^$', index),
    url(r'^login', askbar_login, name='askbar_login'),
    url(r'^categories$', get_categories, name='get_categories'),
    url(r'^getAskList', get_ask_list, name='get_ask_list'),
    url(r'^getAnswerByQuestionId', get_answer_by_question_id, name='get_answer_by_questionId'),
    url(r'^getAnswerDetailById', get_answer_detail_by_id, name='get_answer_detail_by_id'),
    url(r'^getQuestionDetailById', get_question_detail_by_id, name='get_question_detail_by_id'),
    url(r'^submitQuestion', submit_question, name='submit_question'),
    url(r'^submitAnswer', submit_answer, name='submit_answer'),
    url(r'^likeAnswer', like_answer, name='like_answer'),
    url(r'^dislikeAnswer', dislike_answer, name='dislike_answer'),
    url(r'^setBestAnswer', set_best_answer, name='set_best_anser')
]
