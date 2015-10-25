#-*- encoding: utf-8 -*-
from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.shortcuts import render_to_response

def index(request):
    return render_to_response("index.html")

@csrf_exempt
def messages(request):
    if request.method == "GET" or request.method == "OPTIONS":
        response = JsonResponse(
            {
                "messagelist": {
                    "1": {
                        "MsgID": "31747",
                        "Title": u"校党委召开双月座谈会",
                        "Time": "2015/10/23",
                        "ActiveTime": "null",
                        "Auth": "叶泰和"
                    },
                    "2":{
                        "MsgID": 31088,
                        "Title": "学校举行纪念抗战胜利70周年座谈会",
                        "Time": "2015/9/8",
                        "ActiveTime": "null",
                        "Auth": "谢瑾"
                    },
                    "3":{
                        "MsgID": 30625,
                        "Title": "我校举行庆祝建党94周年座谈会",
                        "Time": "2015/7/3",
                        "ActiveTime": "null",
                        "Auth": "赖练"
                    },
                    "4":{
                        "MsgID": 30572,
                        "Title": "我校孙晋良院士在上海市庆祝中国共产党成立94周年座谈会上交流发言",
                        "Time": "2015/7/1",
                        "ActiveTime": "null",
                        "Auth": "赖练"
                    },
                    "5":{
                        "MsgID": 26986,
                        "Title": "建言骨干教师激励计划 服务学校创新人才培养——校党委召开双月座谈会",
                        "Time": "2015/4/29",
                        "ActiveTime": "null",
                        "Auth": "叶泰和"
                    }
                },
                "count": 5,
                "pageCount": 0
            }
        )
        return response
