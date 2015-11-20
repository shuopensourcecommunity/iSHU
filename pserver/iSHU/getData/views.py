from django.shortcuts import render,loader
from django.http import HttpResponse
# Create your views here.
import requests

def index(request):
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
    base_url = 'http://api.shu.edu.cn/Mobile/'
    append_url = 'User/UserLogin/'
    data = {'userName':'13122635',
        'password':'A70920015a'}
    #get_info(base_url,append_url,data)
    res = requests.post(base_url+append_url, data = params)
    return res
    
def campuscalendarspring(request):
    c = requests.get("http://api.shu.edu.cn/Mobile/CampusFile/CampusCalendarSummer")
    return c

def get_jwc_message_list(request):
    pass

def get_xgb_message_list(request):
    pass
