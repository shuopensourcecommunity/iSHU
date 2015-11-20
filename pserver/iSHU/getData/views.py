from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
import requests

def index(request):
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


def get_jwc_message_list(request):
    pass

def get_xgb_message_list(request):
    pass
