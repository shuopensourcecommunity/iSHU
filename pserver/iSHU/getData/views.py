# -*- encoding: utf-8 -*-
from __future__ import print_function
from django.shortcuts import render, loader, RequestContext
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
import requests
import time
import json
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@ensure_csrf_cookie
def index(request):
    meta_info = request.META.get('HTTP_USER_AGENT', None)
    if "QQBrowser" in meta_info:
        return render(request, 'open_in_browser.html')
    else:
        return render(request, "index.html")

@require_http_methods(['POST'])
def user_login(request):
    user_number = request.POST['id']
    user_password = request.POST['pwd']
    base_url = 'http://api.shu.edu.cn/Mobile/'
    append_url = 'User/UserLogin/'
    data = {
        'userName': user_number,
        'password': user_password,
    }
    login_status = requests.post(base_url + append_url, data=data)
    return JsonResponse(login_status.json())

# [校园信息， 学工办， 教务处，活动, 专题活动， 社团活动， 招聘活动, 公益活动， 竞赛活动， 讲座活动]
SECTIONS = ['campus', 'xgb', 'jwc', 'action', 'club_action', 'special_action', 'recruit_action',
            'public_good_action', 'competition_action', 'lecture_action','getcampusmessagebyid',]
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

    'getcampusmessagebyid': 'CampusMessage/GetCampusMessageById',
    'getjwcmessagebyid':    'CampusMessage/GetJwcMessageById',
    'getxgbmessagebyid':    'CampusMessage/GetXgbCampusMessageById'

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

    if data.has_key('currentPage'):
        data['currentPage'] = request.POST.get('current_page', 1)
    if data.has_key('msgId'):
       data['msgId'] = request.POST.get('msg_id')
    # TODO strange datetime
    if data.has_key('startTime'):
        data['startTime'] = '2010-01-01T00:00:00Z'# if data['startTime'] else data['startTime']
    if data.has_key('endTime'):
        data['endTime'] = time.strftime('%Y-%m-%dT%H:%M:%SZ')# if data['endTime'] else data['endTime']

    if section in ['getcampusmessagebyid','getjwcmessagebyid','getxgbmessagebyid']:
        message_list = requests.post(BASE_URL+append_url[section], data=data).json()
        return JsonResponse(message_list)        

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


def getcampusactionbyid(request):
    if request.method == "POST":
        action_id = request.POST['action_id']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionById'
        data = {
            'actionId': action_id,
        }
        message_list = requests.post(base_url + append_url, data=data)
        a = message_list.json()
        a['Summary'] = a['Summary'].replace("\r\n", "<BR />")
        a = JsonResponse(a)
        return a


def applyforcampusaction(request):
    if request.method == "POST":
        action_id = request.POST['action_id']
        username = request.POST['username']
        reason = request.POST['reason']
        phone = request.POST['phone']
        mail = request.POST['mail']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/ApplyForCampusAction'
        data = {
            'persNo': username,
            'actionId': action_id,
            'canYLY': reason,
            'shouJ': phone,
            'youX': mail,
        }
        # print data
        message_list = requests.post(base_url + append_url, data=data)
        # print message_list.content
        a = message_list.json()
        a = JsonResponse(a)
        # print a
        return a
