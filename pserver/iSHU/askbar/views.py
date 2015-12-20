# -*- encoding: utf-8 -*-
from django.shortcuts import render, loader, RequestContext
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
import requests


@ensure_csrf_cookie
@require_http_methods('GET')
def index(request):
    return render(request, '')

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
             '0': {
                "id": 36440,
                "title": "求购上大土木系结构力学历年考题",
                "price": 0,
                "content": "<p>各位大哥大姐&nbsp; 我想问一下有没上大结构力学考研试题&nbsp; 06&nbsp; 07&nbsp; 08 的最好哦&nbsp;&nbsp; 谢谢了</p>",
                "answer_number": 1,
                "category_id": 1
            },
            '1': { ...}
        }
        if any error occurred, return JsonResponse
        {
           "State": "error",
           "Data": '[]'
        }
    """
    msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/Categories").json()
    try:
        # and number to head of msg_res['Data']， Number start from 0
        msg_res['Data'] = dict(enumerate(msg_res['Data']))
        return JsonResponse(msg_res)
    except KeyError as e:
        return JsonResponse({
            "State": "error",
            "Msg": e.message,
            "Data": "[]"
        })
