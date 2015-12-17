# -*- encoding: utf-8 -*-
from django.shortcuts import render, loader
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.views.decorators.http import require_http_methods
import requests
import time
import json
import os

import pdb

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@csrf_exempt
def index(request):
    return render(request, "index.html")


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        user_number = request.POST['id']
        user_password = request.POST['pwd']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'User/UserLogin/'
        data = {'userName': user_number,
                'password': user_password,
                }
        login_status = requests.post(base_url + append_url, data=data)
        content = login_status.json()
        content = JsonResponse(content)
        # print content
        return content

# [校园信息， 学工办， 教务处，活动, 专题活动， 社团活动， 招聘活动]
SECTIONS = ['campus', 'xgb', 'jwc', 'action', 'club_action', 'special_action', 'recruit_action']
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
    'lecture_action':     'CampusAction/GetCampusActionList'
}


@require_http_methods(["POST"])
def get_msg_list(request, section):

    def generate_view():
        with open(os.path.join(BASE_DIR, 'getData/section.json'), "r") as f:
            sections = json.load(f)
            if section in sections:
                return sections[section]
            else:
                # TODO deal with the error
                return {}

    data = generate_view()
    data['currentPage'] = request.POST.get('current_page', 1)

    # TODO strange datetime
    if data.has_key('startTime'):
        data['startTime'] = '2010-01-01T00:00:00Z'# if data['startTime'] else data['startTime']
    if data.has_key('endTime'):
        data['endTime'] = time.strftime('%Y-%m-%dT%H:%M:%SZ')# if data['endTime'] else data['endTime']

    msg_res = requests.post(BASE_URL+append_url[section], data=data).json()
    response = dict()
    try:
        response['pagecount'] = msg_res['pageCount']
    except KeyError as e:
        # TODO deal with the error
        return HttpResponse('ok')

    # TODO ugly code
    if msg_res.has_key('messagelist'):
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
        # print a
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


def getcampusmessagebyid(request):
    if request.method == "POST":
        msg_id = request.POST['msg_id']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusMessage/GetCampusMessageById'
        data = {
            'msgId': msg_id,
        }
        message_list = requests.post(base_url + append_url, data=data)
        a = message_list.json()
        a = JsonResponse(a)
        # print a
        return a


@csrf_exempt
def getjwcmessagebyid(request):
    if request.method == "POST":
        msg_id = request.POST['msg_id']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusMessage/GetJwcMessageById'
        data = {
            'msgId': msg_id,
        }
        message_list = requests.post(base_url + append_url, data=data)
        a = message_list.json()
        a = JsonResponse(a)
        return a
