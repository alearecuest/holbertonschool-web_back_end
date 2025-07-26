#!/usr/bin/env python3
"""
Defines a function that takes a string key
and a numeric value, and returns a tuple of the key
and the square of the value as a float.
"""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Return a (key, value) tuple where value is v squared as a float.
    """
    return (k, float(v ** 2))
