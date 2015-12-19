# -*- encoding: utf-8 -*-
from django.shortcuts import render, loader, RequestContext
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
import requests
import time
import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECTIONS = ['Categories', 'AskList', 'Question']

urls = {
	'Categories':'http://api.shu.edu.cn/Mobile/Lehu/Categories',
	'AskList':	 'http://api.shu.edu.cn/Mobile/Lehu/AskList',
	'Qusetion':	 'http://api.shu.edu.cn/Mobile/Lehu/Question',
}


@require_http_methods(["GET"])
def get_info(request, section):

    def generate_view():
        with open(os.path.join(BASE_DIR, 'askbar/section.json'), "r") as f:
            sections = json.load(f)
            if section in sections:
                return sections[section]
            else:
                # TODO deal with the error
                return {}

    data = generate_view()
    if data.has_key('questionId'):
    	date['questionId'] = request.GET.get('questionId')
    if data.has_key('cid'):
    	date['cid'] = request.GET.get('cid')
    if data.has_key('page'):
    	date['page'] = request.GET.get('page')

	msg_res = requests.get(urls[section],data = data).json()
	if msg_res.has_key('Data'):
	    msg_list = msg_res['Data']

	response = dict()
	for i in range(0, len(msg_list)):
	    c = dict()
	    for key, value in msg_list[i].iteritems():
	        if isinstance(value, (unicode,)):
	            c[key] = value
	        else:
	            c[key] = unicode(value)
	    response[unicode(i+1)] = c
	return JsonResponse(response)