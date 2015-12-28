#!/bin/bash/env python
import re


def strip_tags(raw):
    """

    Args:
        raw: raw data with html tags and &nbsp symbol

    Returns:
        :cooked clean content data
    """
    pattern = r'</?\w+[^>]*>'
    cooked = re.sub(pattern, '', raw)
    cooked = re.sub('&nbsp', cooked)
    return cooked
