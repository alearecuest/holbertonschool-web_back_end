#!/usr/bin/env python3
"""
Defines an asynchronous generator that yields ten random
floating-point numbers between 0 and 10, waiting one second
between each yield.
"""

import asyncio
import random
from typing import Generator


async def async_generator() -> Generator[float, None, None]:
    """
    Asynchronously generates ten random floats between 0 and 10,
    pausing for one second before yielding each value.
    """
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
