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
def  get_campus_message_list(request): 

    if request.method == 'POST':
        print "ok"
        return HttpResponse('ok')
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusMessage/GetCampusMessageList'


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

def campuscalendarspring(request):
    c = requests.get("http://api.shu.edu.cn/Mobile/CampusFile/CampusCalendarSpring")
    return c

@csrf_exempt
def get_jwc_message_list(request):
    pass
@csrf_exempt
def get_xgb_message_list(request):
    pass

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
        print "len(a['messagelist']) =",len(a['messagelist'])
        for i in range(0,len(a['messagelist'])):
            c = {}
            print "i =",i
            print "a['messagelist'][i].iteritems() =",a['messagelist'][i]
            for key, value in a['messagelist'][i].iteritems():
                print "key =",key,"value =",value
                if isinstance(value,(str,)):
                    c[key] = value.encode('utf-8') #['Time']
                    print "if c[key] =",c[key]
                else:
                    c[key] = str(value).decode('utf-8')
                    print "else c[key] =",c[key]

            result[str(i)] = c
        print result
        return json.dumps(result)

