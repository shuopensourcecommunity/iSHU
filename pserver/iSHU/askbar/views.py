# -*- encoding: utf-8 -*-
from django.shortcuts import render, loader, RequestContext
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.utils.datastructures import MultiValueDictKeyError
from django.views.generic.base import View
import requests
from utils import except_handler

@ensure_csrf_cookie
@require_http_methods('GET')
def index(request):
    return render(request, 'shu_ask_index.html')


@require_http_methods(['POST'])
@except_handler
def askbar_login(request):
    data = {
        'userName': request.POST['username'],
        'Password': request.POST['password']
    }
    res_msg = requests.post('http://api.shu.edu.cn/Mobile/User/LehuUserLogin', data=data).json()
    if res_msg['State'] == 'success':
        guid = res_msg['Data']['Guid']
        username = res_msg['Data']['UserName']
        user_id = res_msg['Data']['UserID']
        request.session['user'] = {
            'guid': guid,
            'username': username,
            'user_id': user_id
        }
    return JsonResponse(res_msg)

@require_http_methods(['GET'])
def askbar_logout(request):
    request.session.clear()
    return JsonResponse({
        'State': 'success'
    })


@require_http_methods(['POST'])
@except_handler
def is_login(request):
    if request.POST['user'] == request.session['user']:
        return JsonResponse({
            'State': 'success' # user is login
        })
    else:
        return JsonResponse({
            'State': 'failed'
        })


@require_http_methods(['GET'])
@except_handler
def get_categories(request):
    msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/Categories").json()
    # and number to head of msg_res['Data']， Number start from 0
    msg_res['Data'] = dict(enumerate(msg_res['Data']))
    return JsonResponse(msg_res)


class QuestionView(View):
    type = ''

    def is_owner(self, user_id, question_id):
        user_id = str(user_id)
        question_id = str(question_id)
        return user_id == question_id

    @except_handler
    def get(self, request):
        data = {
            'questionId': request.GET['questionId'],
            'type': self.type
        }
        user_session = request.session.get('user', None)
        if user_session:
            user_id = user_session['user_id']
        else:
            user_id = None

        msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/Question", params=data).json()
        if self.type == 'detail':
            question_owner_id = msg_res['Data'][u'user_id']
        else:
            question_owner_id = None

        if user_id and question_owner_id and self.is_owner(user_id, question_owner_id):
            msg_res['is_owner'] = True
        else:
            msg_res['is_owner'] = False
        return JsonResponse(msg_res)

    @except_handler
    def post(self, request):
        guid = request.POST['guid']
        title = request.POST['title']
        content = request.POST['content']
        cid = request.POST['cid']
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
    allowed_methods = ['get', 'submit', 'like', 'dislike', 'set_best', 'cancel']
    method = None
    cancel_type = ''

    def dispatch(self, request, *args, **kwargs):
        if self.method.lower() in self.allowed_methods:
            handler = getattr(self, self.method.lower(), self.http_method_not_allowed)

        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)

    @except_handler
    def get(self, request):
        data = {
            "answerId": request.GET['answerId']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Answer', params=data).json()
        msg_res['Data'] = dict(enumerate(msg_res['Data']))
        return JsonResponse(msg_res)

    @except_handler
    def submit(self, request):
        data = {
            'guid': request.POST['guid'],
            'content': request.POST['content'],
            'questionId': request.POST['questionId']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Answer', params=data).json()
        return JsonResponse(msg_res)

    @except_handler
    def like(self, request):
        data = {
            'guid': request.POST['guid'],
            'answerId': request.POST['answerId']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Like', params=data).json()
        return JsonResponse(msg_res)

    @except_handler
    def dislike(self, request):
        data = {
            'guid': request.POST.get('guid', None),
            'answerId': request.POST.get('answerId', None)
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Dislike', params=data).json()
        return JsonResponse(msg_res)

    @except_handler
    def cancel(self, request):
        data = {
            'guid': request.POST.get('guid', None),
            'answerId': request.POST.get('answerId', None),
            'type': self.cancel_type
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/Cancel', params=data).json()
        return JsonResponse(msg_res)

    @except_handler
    def set_best(self, request):
        data = {
            'guid': request.POST['guid'],
            'answerId': request.POST['answerId']
        }
        msg_res = requests.get('http://api.shu.edu.cn/Mobile/Lehu/SetBest', params=data).json()
        return JsonResponse(msg_res)

    def http_method_not_allowed(self, request, *args, **kwargs):
        raise Http404('method not allowed')


@require_http_methods(['GET'])
@except_handler
def get_ask_list(request):
    data = {
        "cid": request.GET.get('cid', None),
        "page": request.GET['page']
    }
    msg_res = requests.get("http://api.shu.edu.cn/Mobile/Lehu/AskList", params=data).json()
    msg_res['Data'] = dict(enumerate(msg_res['Data']))
    return JsonResponse(msg_res)
