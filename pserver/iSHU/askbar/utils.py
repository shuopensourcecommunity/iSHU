#!/bin/bash/env python
import re
from functools import wraps
from django.utils.datastructures import MultiValueDictKeyError
from django.http import Http404, JsonResponse


def strip_tags(raw, space=False):
    """

    Args:
        raw: raw data with html tags and &nbsp symbol
        space: choose ignore space or not
    Returns:
        :cooked clean content data
    """
    pattern = r'</?\w+[^>]*>'
    cooked = re.sub(pattern, '', raw)
    if space:
        cooked = re.sub('&nbsp', cooked)
    return cooked


def except_handler(func, *args, **kwargs):
    """
    Decorator for uniform error handle
    Args:
        func:
        *args:
        **kwargs:

    Returns:

    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            raw_return = func(*args, **kwargs)
        except MultiValueDictKeyError as e:
            return JsonResponse({
                "State": "error",
                "Msg": "MultiValueDictKeyError: {} ;"
                       "Function: {}".format(e.message, func.__name__)
            })
        except ValueError as e:
            return JsonResponse({
                "State": "error",
                "Msg": "Value Error: {} ;"
                       "Function: {}".format(e.message, func.__name__)
            })
        except AttributeError as e:
            return JsonResponse({
                "State": "error",
                "Msg": "Value Error: {}; "
                       "Function: {}".format(e.message, func.__name__)
            })
        else:
            return raw_return
    return wrapper



