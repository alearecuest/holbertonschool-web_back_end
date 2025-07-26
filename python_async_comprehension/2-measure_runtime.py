#!/usr/bin/env python3
"""
Defines a coroutine that runs async_comprehension four times
in parallel and returns the total elapsed time.
"""
import asyncio
import time
from typing import Coroutine

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    Execute async_comprehension four times concurrently and
    measure the total runtime.

    Returns:
        The total elapsed time in seconds. It will be roughly
        10 seconds because each async_comprehension awaits ten
        1-second sleeps and all four run in parallel.
    """
    start: float = time.perf_counter()
    await asyncio.gather(*(async_comprehension() for _ in range(4)))
    end: float = time.perf_counter()
    return end - start
