#!/usr/bin/env python3
"""
Defines a function that returns each element paired with its length.
"""
from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Return a list of tuples where each tuple contains an element from lst
    and the length of that element.
    """
    return [(i, len(i)) for i in lst]
