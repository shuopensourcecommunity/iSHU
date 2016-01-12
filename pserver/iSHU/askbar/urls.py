# -*- encoding: utf-8 -*-
from django.conf.urls import url
from views import *

urlpatterns = [
    url(r'^$', index),
    url(r'^login', askbar_login, name='askbar_login'),
    url(r'^logout', askbar_logout, name='askbar_logout'),
    url(r'^isLogin', is_login, name='is_login?'),
    url(r'^categories$', get_categories, name='get_categories'),
    url(r'^getAskList', get_ask_list, name='get_ask_list'),

    # Question related url
    url(r'^getQuestionDetail', QuestionView.as_view(type='detail'), name='get_question_detail_by_id'),
    url(r'^getQuestionAnswers', QuestionView.as_view(type='answers'), name='get_question_answer'),
    url(r'^getQuestionBestAnswers', QuestionView.as_view(type='bestAnswers'), name='get_question_best_answer'),
    url(r'^submitQuestion', QuestionView.as_view(), name='submit_question'),

    # Answer related url
    url(r'^getAnswerDetail', AnswerView.as_view(method='get'), name='get_answer_detail_by_id'),
    url(r'^submitAnswer', AnswerView.as_view(method='submit'), name='submitAnswer'),
    url(r'^likeAnswer', AnswerView.as_view(method='like'), name='like_answer'),
    url(r'^dislikeAnswer', AnswerView.as_view(method='dislike'), name='dislike_answer'),
    url(r'^setBestAnswer', AnswerView.as_view(method='set_best'), name='set_best_answer'),
    url(r'^cancelLike', AnswerView.as_view(method='cancel', cancel_type='like'), name='cancel_like'),
    url(r'^cancelDislike', AnswerView.as_view(method='cancel', cancel_type='dislike'), name='cancel_dislike'),
    url(r'^cancelSetBest', AnswerView.as_view(method='cancel', cancel_type='setBest'), name='cancel_set_best')
]
