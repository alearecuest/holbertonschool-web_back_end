#!/usr/bin/env python3
"""
Defines a function that generates a multiplier function.
"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    Return a function that multiplies a float by the given multiplier.
    """
    def _mult(x: float) -> float:
        return x * multiplier
    return _mult

