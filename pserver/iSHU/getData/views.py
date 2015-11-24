
from django.shortcuts import render,loader

from django.http import HttpResponse
# Create your views here.
import requests

def index(request):
    print 'aa'
    #t = loader.get_template("index.html") 
    #return HttpResponse(t.render(request))
    return render(request, "index.html")
#BASE_URL = "http://api.shu.edu.cn/Mobile/"
def get_info(base_url,  append_url, params):
    res = requests.post(base_url+append_url, data = params)
    print res.text



def  get_campus_message_list(request): 

    if request.methods == 'POST':
        print "ok"
        return HttpResponse('ok')
        base_url = 'http://api.shu.edu.cn/Mobile/'
        append_url = 'CampusMessage/GetCampusMessageList'



def userlogin(request):
    if request.methods == 'POST':
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

def getcampuscessagelist(request):
    if request.method == 'GET':
        import time
        current_page = request.GET['current_page']
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
            'currentPage':currentPage,
        }
        message_list = requests.post(base_url+append_url, data = data)
        return message_list.content


def campuscalendarspring(request):
    c = requests.get("http://api.shu.edu.cn/Mobile/CampusFile/CampusCalendarSpring")
    return c


def get_jwc_message_list(request):
    pass

def get_xgb_message_list(request):
    pass
