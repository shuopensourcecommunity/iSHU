#-*- encoding: utf-8 -*-

from django.shortcuts import render,loader

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt
# Create your views here.
import requests
@csrf_exempt
def index(request):
    #t = loader.get_template("index.html") 
    #return HttpResponse(t.render(request))
    return render(request, "index.html")
#BASE_URL = "http://api.shu.edu.cn/Mobile/"
@csrf_exempt
def get_info(base_url,  append_url, params):
    res = requests.post(base_url+append_url, data = params)
    print res.text

@csrf_exempt
def userlogin(request):
    if request.method == 'POST':
        user_number = request.POST['id']
        user_password = requests.POST['pwd']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'User/UserLogin/'
        data = {'userName':user_number,
                'password':user_password,
                }
        #get_info(base_url,append_url,data)
        login_status = requests.post(base_url+append_url, data = data)
        return login_status

@csrf_exempt
def postcampuscessagelist(request):
    print request.method
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        print current_page
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusMessage/GetCampusMessageList/'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        print current_page
        data = { 
            'keyword':'',
            'type':203,
            'limit':10,
            'startTime':starttime,
            'endTime':endtime,
            'currentPage':current_page,
        }
        message_list = requests.post(base_url+append_url, data = data)
        a = message_list.json()
        result = {}
        for i in range(0,len(a['messagelist'])):
            c = {}
            for key, value in a['messagelist'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        result = JsonResponse(result)
        print result
        return result

@csrf_exempt
def getxgbmessagelist(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        print current_page
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusMessage/GetXgbMessageList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'limit':10,
            'startTime':starttime,
            'endTime':endtime,
            'currentPage':current_page,
        }
        message_list = requests.post(base_url+append_url, data = data)
        a = message_list.json()
        result = {}
        for i in range(0,len(a['messagelist'])):
            c = {}
            for key, value in a['messagelist'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        xgbresult = JsonResponse(result)
        return xgbresult

@csrf_exempt
def getjwcmessagelist(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        print current_page
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusMessage/GetJwcMessageList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'limit':10,
            'startTime':starttime,
            'endTime':endtime,
            'currentPage':current_page,
        }
        message_list = requests.post(base_url+append_url, data = data)
        a = message_list.json()
        result = {}
        for i in range(0,len(a['messagelist'])):
            c = {}
            for key, value in a['messagelist'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c
        jwcresult = JsonResponse(result)
        return jwcresult    

@csrf_exempt
def getgampusactionlist(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'method':99,
            'type':3,
            'limit':10,
            #'startTime':'',
            #'endTime':'',
            'currentPage':current_page,
            #'count':'',
        }
        message_list = requests.post(base_url+append_url, data = data)
        print message_list.content
        a = message_list.json()
        #print a
        result = {}
        for i in range(0,len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c      
        result = JsonResponse(result)
        return result

@csrf_exempt
def getzhuanti(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'method':6,
            'type':3,
            'limit':10,
            #'startTime':'',
            #'endTime':'',
            'currentPage':current_page,
            #'count':'',
        }
        message_list = requests.post(base_url+append_url, data = data)
        print message_list.content
        a = message_list.json()
        #print a
        result = {}
        for i in range(0,len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c      
        result = JsonResponse(result)
        return result

@csrf_exempt
def getshetuan(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'method':5,
            'type':3,
            'limit':10,
            #'startTime':'',
            #'endTime':'',
            'currentPage':current_page,
            #'count':'',
        }
        message_list = requests.post(base_url+append_url, data = data)
        print message_list.content
        a = message_list.json()
        #print a
        result = {}
        for i in range(0,len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c      
        result = JsonResponse(result)
        return result

@csrf_exempt
def getzhaopin(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'method':4,
            'type':3,
            'limit':10,
            #'startTime':'',
            #'endTime':'',
            'currentPage':current_page,
            #'count':'',
        }
        message_list = requests.post(base_url+append_url, data = data)
        print message_list.content
        a = message_list.json()
        #print a
        result = {}
        for i in range(0,len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c      
        result = JsonResponse(result)
        print result
        return result

@csrf_exempt
def getgongyi(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'method':3,
            'type':3,
            'limit':10,
            #'startTime':'',
            #'endTime':'',
            'currentPage':current_page,
            #'count':'',
        }
        message_list = requests.post(base_url+append_url, data = data)
        print message_list.content
        a = message_list.json()
        #print a
        result = {}
        for i in range(0,len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c      
        result = JsonResponse(result)
        return result

@csrf_exempt
def getbisai(request):
    if request.method == "POST":
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'method':2,
            'type':3,
            'limit':10,
            #'startTime':'',
            #'endTime':'',
            'currentPage':current_page,
            #'count':'',
        }
        message_list = requests.post(base_url+append_url, data = data)
        print message_list.content
        a = message_list.json()
        #print a
        result = {}
        for i in range(0,len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c      
        result = JsonResponse(result)
        return result

@csrf_exempt
def getjiangzuo(request):
    if request.method == "POST":
        print "a"
        import time
        current_page = request.POST['current_page']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionList'
        starttime = '2010-01-01T00:00:00Z'
        endtime = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        data = { 
            'keyword':'',
            'method':1,
            'type':3,
            'limit':10,
            #'startTime':'',
            #'endTime':'',
            'currentPage':current_page,
            #'count':'',
        }
        message_list = requests.post(base_url+append_url, data = data)
        print message_list.content
        a = message_list.json()
        #print a
        result = {}
        for i in range(0,len(a['messageList'])):
            c = {}
            for key, value in a['messageList'][i].iteritems():
                if isinstance(value,(unicode,)):
                    c[key] = value 
                else:
                    c[key] = unicode(value)
            result[unicode(i)] = c      
        result = JsonResponse(result)
        print result
        return result


@csrf_exempt
def getcampusactionbyid(request):
    if request.method == "POST":
        action_id = request.POST['action_id']
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusAction/GetCampusActionById'
        data = {
            'actionId':action_id,
        }
        message_list = requests.post(base_url+append_url, data = data)
        a = message_list.json()
        a = JsonResponse(a)
        print a
        return a