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

# [校园信息， 学工办， 教务处，活动]
SECTIONS = ['campus', 'xgb', 'jwc', 'action', ]
BASE_URL = 'http://api.shu.edu.cn/Mobile/CampusMessage/'
append_url = {
    'campus': 'GetCampusMessageList/',
    'xgb':    'GetXgbMessageList',
    'jwc':    'GetJwcMessageList',
    'action': 'GetCampusActionList',
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
    data['currentPage'] = request.POST['current_page']
    data['startTime'] = '2010-01-01T00:00:00Z'# if data['startTime'] else data['startTime']
    data['endTime'] = time.strftime('%Y-%m-%dT%H:%M:%SZ')# if data['endTime'] else data['endTime']

    msg_res = requests.post(BASE_URL+append_url[section], data=data).json()
    response = dict()
    try:
        response['pagecount'] = msg_res['pageCount']
    except KeyError as e:
        # TODO deal with the error
        return HttpResponse('ok')
    lens = len(msg_res['messagelist'])
    for i in range(0, lens):
        c = dict()
        for key, value in msg_res['messagelist'][i].iteritems():
            if isinstance(value, (unicode,)):
                c[key] = value
            else:
                c[key] = unicode(value)
        response[unicode(i)] = c
    return JsonResponse(response)



def getgampusactionlist(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = {
            'keyword': '',
            'method': 99,
            'type': 3,
            'limit': 10,
            # 'startTime':'',
            # 'endTime':'',
            'currentPage': current_page,
            # 'count':'',
        }
        message_list = requests.post(base_url + append_url, data=data)
        a = message_list.json()
        # print a
        result = {}
        result['pagecount'] = a['pageCount']
        for i in range(0, len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value, (unicode,)):
                    c[key] = value
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        result = JsonResponse(result)
        return result



def getzhuanti(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = {
            'keyword': '',
            'method': 6,
            'type': 3,
            'limit': 10,
            # 'startTime':'',
            # 'endTime':'',
            'currentPage': current_page,
            # 'count':'',
        }
        message_list = requests.post(base_url + append_url, data=data)
        a = message_list.json()
        result = {}
        result['pagecount'] = a['pageCount']
        for i in range(0, len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value, (unicode,)):
                    c[key] = value
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        result = JsonResponse(result)
        return result


def getshetuan(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = {
            'keyword': '',
            'method': 5,
            'type': 3,
            'limit': 10,
            # 'startTime':'',
            # 'endTime':'',
            'currentPage': current_page,
            # 'count':'',
        }
        message_list = requests.post(base_url + append_url, data=data)
        a = message_list.json()
        result = {}
        result['pagecount'] = a['pageCount']
        for i in range(0, len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value, (unicode,)):
                    c[key] = value
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        result = JsonResponse(result)
        return result



def getzhaopin(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = {
            'keyword': '',
            'method': 4,
            'type': 3,
            'limit': 10,
            # 'startTime':'',
            # 'endTime':'',
            'currentPage': current_page,
            # 'count':'',
        }
        message_list = requests.post(base_url + append_url, data=data)
        # print message_list.content
        a = message_list.json()
        result = {}
        result['pagecount'] = a['pageCount']
        for i in range(0, len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value, (unicode,)):
                    c[key] = value
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        result = JsonResponse(result)
        # print result
        return result



def getgongyi(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = {
            'keyword': '',
            'method': 3,
            'type': 3,
            'limit': 10,
            # 'startTime':'',
            # 'endTime':'',
            'currentPage': current_page,
            # 'count':'',
        }
        message_list = requests.post(base_url + append_url, data=data)
        # print message_list.content
        a = message_list.json()
        result = {}
        result['pagecount'] = a['pageCount']
        for i in range(0, len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value, (unicode,)):
                    c[key] = value
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        result = JsonResponse(result)
        return result



def getbisai(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = {
            'keyword': '',
            'method': 2,
            'type': 3,
            'limit': 10,
            # 'startTime':'',
            # 'endTime':'',
            'currentPage': current_page,
            # 'count':'',
        }
        message_list = requests.post(base_url + append_url, data=data)
        # print message_list.content
        a = message_list.json()
        result = {}
        result['pagecount'] = a['pageCount']
        for i in range(0, len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value, (unicode,)):
                    c[key] = value
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        result = JsonResponse(result)
        return result



def getjiangzuo(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = {
            'keyword': '',
            'method': 1,
            'type': 3,
            'limit': 10,
            # 'startTime':'',
            # 'endTime':'',
            'currentPage': current_page,
            # 'count':'',
        }
        message_list = requests.post(base_url + append_url, data=data)
        a = message_list.json()
        result = {}
        result['pagecount'] = a['pageCount']
        for i in range(0, len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value, (unicode,)):
                    c[key] = value
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        result = JsonResponse(result)
        # print result
        return result



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
