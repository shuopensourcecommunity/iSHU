#!/bin/bash/env python
import re


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
