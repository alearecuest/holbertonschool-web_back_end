#!/usr/bin/env python3
"""
Defines a coroutine that uses an async comprehension to
gather ten random floats from the async_generator and
return them as a list.
"""
from typing import List

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """
    Asynchronously collects ten random floats by iterating over async_generator
    with an async list comprehension, then returns the collected values.
    """
    return [value async for value in async_generator()]
