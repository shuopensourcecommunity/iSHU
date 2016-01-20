# -*- encoding: utf-8 -*-
from __future__ import print_function
from django.shortcuts import render, loader, RequestContext
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.views.defaults import page_not_found, server_error
import requests
import time
import json
import os

import logging

logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@ensure_csrf_cookie
def index(request):
    # meta_info = request.META.get('HTTP_USER_AGENT', None)
    # if "QQBrowser" in meta_info:
    #     return render(request, 'open_in_browser.html')
    # else:
    return render(request, "index.html")


@require_http_methods(['POST'])
def user_login(request):
    username = request.POST['id']
    password = request.POST['pwd']
    base_url = 'http://api.shu.edu.cn/Mobile/User/UserLogin/'
    data = {
        'userName': username,
        'password': password,
    }
    login_status = requests.post(base_url, data=data).json()
    return JsonResponse(login_status)


# [校园信息， 学工办， 教务处，活动, 专题活动， 社团活动， 招聘活动, 公益活动， 竞赛活动， 讲座活动]
SECTIONS = ['campus', 'xgb', 'jwc', 'action', 'club_action', 'special_action', 'recruit_action',
            'public_good_action', 'competition_action', 'lecture_action']
BASE_URL = 'http://api.shu.edu.cn/Mobile/'
append_url = {
    'campus': 'CampusMessage/GetCampusMessageList/',
    'xgb':    'CampusMessage/GetXgbMessageList/',
    'jwc':    'CampusMessage/GetJwcMessageList/',
    'action': 'CampusAction/GetCampusActionList/',
    'club_action':   'CampusAction/GetCampusActionList',
    'special_action': 'CampusAction/GetCampusActionList',
    'recruit_action': 'CampusAction/GetCampusActionList',
    'public_good_action': 'CampusAction/GetCampusActionList',
    'competition_action': 'CampusAction/GetCampusActionList',
    'lecture_action':     'CampusAction/GetCampusActionList',
}


@require_http_methods(["POST"])
def get_msg_list(request, section):
    """

    Args:
        request:
        section:

    Returns:
        if error occure return
        {
           "State": "error",
           "Msg": error.message,
           "Data": [],
        }
    """
    
    def generate_view():
        with open(os.path.join(BASE_DIR, 'getData/section.json'), "r") as f:
            sections = json.load(f)
            if section in sections:
                return sections[section]
            else:
                # TODO deal with the error
                return {}

    data = generate_view()

    if 'currentPage' in data:
        data['currentPage'] = request.POST.get('current_page', 1)
    # TODO strange datetime
    if 'startTime' in data:
        data['startTime'] = '2010-01-01T00:00:00Z'# if data['startTime'] else data['startTime']
    if 'endTime' in data:
        data['endTime'] = time.strftime('%Y-%m-%dT%H:%M:%SZ')# if data['endTime'] else data['endTime']

    msg_res = requests.post(BASE_URL+append_url[section], data=data).json()

    response = dict()
    try:
        response['pagecount'] = msg_res['pageCount']
    except KeyError as e:
        # TODO deal with the error
        return JsonResponse({
            "State": "error",
            "Msg": e.message,
            "Data": "[]"
        })

    if 'messagelist' in msg_res.keys():
        msg_list = msg_res['messagelist']
    else:
        msg_list = msg_res['messageList']
    lens = len(msg_list)
    for i in range(0, lens):
        c = dict()
        for key, value in msg_list[i].iteritems():
            if isinstance(value, (unicode,)):
                c[key] = value
            else:
                c[key] = unicode(value)
        response[unicode(i)] = c
    return JsonResponse(response)


@require_http_methods(['POST'])
def get_campus_message_by_id(request):
    data = {
        'msgId': request.POST.get('msg_id', None)
    }
    res_msg = requests.post("http://api.shu.edu.cn/Mobile/CampusMessage/GetCampusMessageById", data=data).json()
    return JsonResponse(res_msg)


@require_http_methods(['POST'])
def get_xgb_message_by_id(request):
    data = {
        'msgId': request.POST.get('msg_id', None)
    }
    res_msg = requests.post("http://api.shu.edu.cn/Mobile/CampusMessage/GetXgbCampusMessageById", data=data).json()
    return JsonResponse(res_msg)


@require_http_methods(['POST'])
def get_jwc_message_by_id(request):
    data = {
        'msgId': request.POST.get('msg_id', None)
    }
    res_msg = requests.post("http://api.shu.edu.cn/Mobile/CampusMessage/GetJwcMessageById", data=data).json()
    return JsonResponse(res_msg)


@require_http_methods(['POST'])
def get_campus_action_by_id(request):
    base_url = 'http://api.shu.edu.cn/Mobile/CampusAction/GetCampusActionById'
    data = {
        'actionId': request.POST.get('action_id',None)
    }
    res_msg = requests.post(base_url, data=data).json()
    res_msg['Summary'] = res_msg['Summary'].replace("\r\n", "<BR />")
    return JsonResponse(res_msg)


@require_http_methods(['POST'])
def apply_for_campus_action(request):
    base_url = 'http://api.shu.edu.cn/Mobile/CampusAction/ApplyForCampusAction'
    data = {
        'persNo': request.POST['username'],
        'actionId': request.POST['action_id'],
        'canYLY': request.POST['reason'],
        'shouJ': request.POST['phone'],
        'youX': request.POST['mail']
    }

    res_msg = requests.post(base_url, data=data).json()
    return JsonResponse(res_msg)
