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

@csrf_exempt
def messageText(request):
    if request.method == "GET" or request.method == "OPTIONS":
        response = JsonResponse(
            {
                "Summary": "10月22日上午，校党委在校本部行政楼403会议室召开双月座谈会，会议的主题是建言学校&#8220;十三五&#8221;规划，共谋学校未来发展。校党委副书记、副校长李友梅出席会议并讲话，各民主党派、统战团体主要负责人，无党派人士代表等近20人参加会议。会议由校党委统战部常务副部长吴国琴主持。</span>age发展规划处副处长陈付学介绍了学校&#8220;十三五&#8221;规划编制的背景和过程，并对已经形成的征求意见稿进行了简要的说明。民盟上大委员会秘书长秦钠，民建上大委员会主委刘俊敏，民进上大委员会主委丁亚萍，农工党上大支部委员董丽敏，致公党上大委员会副主委康丽英，九三学社上大委员会副主委刘廷章、许斌，校侨联副主席蓝箭、姜颖，校民族联副主任向群，校欧美同学会副会长兼秘书长翁新楚，校知联会理事胡国辉，无党派人士郝健、陈捷、仲星明等先后发言，他们结合学校实际和发展目标，宏观微观并举，重点对征求意见稿中的&#8220;十二五&#8221;总结和&#8220;十三五&#8221;建设任务等部分提出了意见和建议。李友梅对大家提出的建议给予总体回应，她希望广大统战成员在国家全面深化教育改革的大背景下，继续围绕学校中心，立足岗位，着眼长远，主动献计出力，为学校&#8220;十二五&#8221;顺利收官和&#8220;十三五&#8221;顺利开局贡献力量。"
            }
        )
        return response
