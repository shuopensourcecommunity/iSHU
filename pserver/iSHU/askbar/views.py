# -*- encoding: utf-8 -*-
from django.shortcuts import render, loader, RequestContext
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.utils.datastructures import MultiValueDictKeyError
import requests
import utils

@ensure_csrf_cookie
@require_http_methods('GET')
def index(request):
    return render(request, 'shu_ask_index.html')


@require_http_methods(['GET'])
def get_categories(request):
    """
    Args:
        request:

    Returns:
        if success to get Data, return JsonResponse
        {
            "State": "success",
            "Msg": "",
            "Data": [
                "0": {
                 "ID": 1,
                 "Name": "招生情况",
                 "SortID": 1,
                 "Mid": null
                },
                "1": {...}
        }
        if any error occurred, return JsonResponse
        {
           "State": "error",
           "Msg": error message
           "Data": '[]'
        }
    """
    msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/Categories").json()
    try:
        # and number to head of msg_res['Data']， Number start from 0
        msg_res['Data'] = dict(enumerate(msg_res['Data']))
        return JsonResponse(msg_res)
    except MultiValueDictKeyError as e:
        return JsonResponse({
            "State": "error",
            "Msg": e.message,
            "Data": "[]"
        })


@require_http_methods(['GET'])
def get_ask_list(request):
    """
    get question list data
    Args:
        request:
            request GET method give to params:
            {
              "cid": 1,
              "page": 1
            }
    Returns:
        if success, return
        {
            "State": "success",
            "Msg": "",
            "Data": [
                "0":{
                    "id": 36440,
                    "title": "求购上大土木系结构力学历年考题",
                    "price": 0,
                    "content": "<p>各位大哥大姐&nbsp; 我想问一下有没上大结构力学考研试题&nbsp; 06&nbsp; 07&nbsp; 08 的最好哦&nbsp;&nbsp; 谢谢了</p>",
                    "answer_number": 1,
                    "category_id": 1
                },
                "1":{...}

        if failed, return
        {
            "State": "error",
            "Msg" : error message
            "Data": []
        }

    """
    try:
        data = {
            "cid": request.GET['cid'],
            "page": request.GET['page']
        }
        msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/AskList", data=data).json()
        msg_res['Data'] = dict(enumerate(msg_res['Data']))
        return JsonResponse(msg_res)
    except MultiValueDictKeyError as e:
        return JsonResponse({
            "State": "error",
            "Msg": e.message,
            "Data": []
        })


@require_http_methods(['GET'])
def get_answer_by_question_id(request):
    """
    get answers detail by question ID which answers belong to
    Args:
        request:

    Returns:
        if success , return
        {
          "State": "success",
          "Msg": "",
          "Data": [
            "1": {
              "answerId": 317084,
              "name": null,
              "time": "2008-09-23T20:46:25",
              "agree": 0,
              "disagree": 0,
              "is_best": false,
              "content": "我有2007年的，2008年的是自己考的，还记得几道大题。\r\n"
            },
            "2": {...}
          ]
        }
        else if failed, return
        {
            "State": "error",
            "Msg" : error msg,
            "Data": []
        }

    """
    try:
        data = {
            "questionId": request.GET['questionId'],
            "type": request.GET['type']
        }
        msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/Question", data=data).json()
        msg_res['Data'] = dict(enumerate(msg_res['Data']))
        return JsonResponse(msg_res)
    except MultiValueDictKeyError as e:
        return JsonResponse({
            "State": "error",
            "Msg": e,
            "Data": ""
        })


# TODO NOT TESTED
@require_http_methods(['GET'])
def get_answer_detail_by_id(request):
    """
    Args:
        request:

    Returns:

    """
    try:
        data = {
            "answerId": request.GET['answerId']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Answer', data=data).json()
        msg_res['Data'] = dict(enumerate(msg_res['Data']))
        return JsonResponse(msg_res)
    except MultiValueDictKeyError as e:
        return JsonResponse({
            "State": "error",
            "Msg": e.message,
            "Data": ""
        })


def search_questions(request):
    """

    Args:
        request:

    Returns:

    """
    pass
