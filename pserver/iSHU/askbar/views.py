# -*- encoding: utf-8 -*-
from django.shortcuts import render, loader, RequestContext
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.utils.datastructures import MultiValueDictKeyError
from django.views.generic.base import View
import requests
import utils

@ensure_csrf_cookie
@require_http_methods('GET')
def index(request):
    return render(request, 'shu_ask_index.html')


@require_http_methods(['POST'])
def askbar_login(request):
    data = {
        'userName': request.POST['username'],
        'Password': request.POST['password']
    }
    try:
        res_msg = requests.post('http://api.shu.edu.cn/Mobile/User/LehuUserLogin', data=data).json()
        return JsonResponse(res_msg)
    except AttributeError as e:
        return JsonResponse({
            "status": e.message
        })


@require_http_methods(['GET'])
def get_categories(request):
    try:
        msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/Categories").json()
        # and number to head of msg_res['Data']， Number start from 0
        msg_res['Data'] = dict(enumerate(msg_res['Data']))
        return JsonResponse(msg_res)
    except MultiValueDictKeyError as e:
        return JsonResponse({
            "State": "error",
            "Msg": e.message,
            "Data": "[]"
        })
    except AttributeError as e:
        return JsonResponse({
            "State": "error",
            "Msg": "server response null",
            "Data": "[]"
        })


class QuestionView(View):
    type = ''

    def get(self, request):
        data = {
            'questionId': request.GET['questionId'],
            'type': self.type
        }
        msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/Question", params=data).json()
        return JsonResponse(msg_res)

    def post(self, request):
        try:
            guid = request.POST['guid']
            title = request.POST['title']
            content = request.POST['content']
            cid = request.POST['cid']
        except MultiValueDictKeyError as e:
            return JsonResponse({
                'State': 'error',
                'Msg': 'lack of params'
            })

        data = {
            'guid': guid,
            'title': title,
            'content': content,
            'cid': cid
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Question', params=data).json()
        return JsonResponse(msg_res)

    def http_method_not_allowed(self, request, *args, **kwargs):
        raise Http404('method not allowed')


class AnswerView(View):
    allowed_methods = ['get', 'post', 'like', 'dislike', 'set_best']
    method = None

    def dispatch(self, request, *args, **kwargs):
        if self.method.lower() in self.allowed_methods:
            handler = getattr(self, self.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)

    @require_http_methods(['GET'])
    def get(self, request):
        try:
            data = {
                "answerId": request.GET['answerId']
            }
            msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Answer', params=data).json()
            msg_res['Data'] = dict(enumerate(msg_res['Data']))
            return JsonResponse(msg_res)
        except MultiValueDictKeyError as e:
            return JsonResponse({
                "State": "error",
                "Msg": e.message,
                "Data": ""
            })

    @require_http_methods(['POST'])
    def post(self, request):
        data = {
            'guid': request.POST['guid'],
            'content': request.POST['content'],
            'questionId': request.POST['question_id']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Answer', params=data).json()
        return JsonResponse(msg_res)

    @require_http_methods(['POST'])
    def like(self, request):
        data = {
            'guid': request.POST['guid'],
            'answerId': request.POST['answer_id']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Like', params=data).json()
        return JsonResponse(msg_res)

    @require_http_methods(['POST'])
    def dislike(self, request):
        data = {
            'guid': request.POST['guid'],
            'answerId': request.POST['answer_id']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Unlike', params=data).json()
        return JsonResponse(msg_res)

    @require_http_methods(['POST'])
    def set_best(self, request):
        data = {
            'guid': request.POST['guid'],
            'answerId': request.POST['answer_id']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/SetBest', params=data).json()
        return JsonResponse(msg_res)

    def http_method_not_allowed(self, request, *args, **kwargs):
        raise Http404('method not allowed')


@require_http_methods(['GET'])
def get_ask_list(request):
    try:
        data = {
            "cid": request.GET.get('cid', None),
            "page": request.GET['page']
        }
        msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/AskList", params=data).json()
        msg_res['Data'] = dict(enumerate(msg_res['Data']))
        return JsonResponse(msg_res)
    except MultiValueDictKeyError as e:
        return JsonResponse({
            'State': "error",
            'Msg': e.message,
            'Data': '[]'
        })
    except AttributeError as e:
        return JsonResponse({
            'State':  'error',
            'Msg': 'server response null',
            'Data': '[]'
        })
